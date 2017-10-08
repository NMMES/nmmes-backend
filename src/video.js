'use strict';

import chalk from 'chalk';
import EventEmitter from 'events';
import ffmpeg from 'fluent-ffmpeg';
import moment from 'moment';
require("moment-duration-format");
import Promise from 'bluebird';
import fs from 'fs';
import fileSize from 'filesize';
import {
    merge
} from 'lodash';
import Path from 'path';

const stat = Promise.promisify(fs.stat);

import Logger from './logger.js';

export default class Video extends EventEmitter {
    curretModuleIndex = 0;
    moduleCache = {};
    running = false;
    started = false;
    constructor(options) {
        Logger.debug(`Creating ${chalk.bold(Path.basename(options.input.path))}.`);

        if (!options.input.path)
            throw new Error('options.input.path must be provided.');
        if (!options.output.path)
            throw new Error('options.output.path must be provided.');

        super();

        merge(this, {
            strict: true,
            modules: [],
            input: { ...Path.parse(options.input.path),
                map: {
                    streams: {},
                    format: {}
                }
            },
            output: { ...Path.parse(options.output.path),
                map: {
                    streams: {},
                    format: {}
                }
            }
        }, options);

        // checkForUpdates(this.modules);

        Logger.trace('Video created:\n', this);
    }
    initialize() {
        let _self = this;
        return new Promise((resolve, reject) => {
            Logger.trace('Generating metadata for input...');
            ffmpeg.ffprobe(_self.input.path, function(err, metadata) {
                if (err)
                    return reject(err);

                // Lets do some metadata manipulation, I want the streams array as an
                // object
                metadata.streams = metadata.streams.reduce((obj, stream) => {
                    stream.input = 0;
                    obj[stream.index] = stream;
                    return obj;
                }, {});

                _self.input.metadata = {
                    0: metadata
                };

                const streams = Object.values(metadata.streams);
                for (let pos in streams) {
                    const stream = streams[pos];

                    _self.output.map.streams[stream.index] = {
                        map: `${stream.input}:${stream.index}`,
                        ['metadata:s:' + pos]: [],
                        ['disposition:' + pos]: [],
                        vf: [],
                        af: []
                    };
                }

                if (isNaN(metadata.format.duration)) {
                    Logger.trace('Invalid duration:', chalk.bold(metadata.format.duration));
                    Logger.debug(`Duration invalid, attempting to calculate manually...`);
                    Video.calcDuration(_self.input.path).then((duration) => {
                        Logger.debug(`Duration calculated to ${duration} second(s).`);
                        metadata.format.duration = duration;
                        resolve();
                    }, reject);
                } else {
                    resolve();
                }
            });
        });
    }

    start() {
        let _self = this;
        this.running = true;
        this.started = true;
        this.emit('start');
        Logger.info(`Started processing ${chalk.bold(this.input.base)} -> ${chalk.bold(this.output.base)}.`);
        this.startTime = new Date();

        return new Promise((resolve, reject) => {
            // Run module init
            Promise
                .all(this.modules.reduce((array, module) => {
                    if (!module.init)
                        return array;
                    array.push(new Promise((resolve, reject) => {
                        module.init(_self).then(resolve, (err) => {
                            Logger.error(`Module ${chalk.bold(module.displayName)} initialization failed: ${err.message}`);
                            Logger.debug('Error:', err);
                            reject(new Error('Module initialization failed.'));
                        });
                    }));
                    return array;
                }, []))
                .then(this.initialize.bind(this))
                .then(resolve)
                .return(0)
                .then(this.runModule.bind(this), (err) => {
                    this._stop(err);
                    reject(err);
                });
        });
    }

    runModule(number = this.curretModuleIndex) {
        if (!this.modules[number]) {
            this._stop();
            return;
        }
        if (this.stopTime)
            return;
        const moduleName = this.modules[number].displayName;
        Logger.trace(`Running module ${chalk.bold(moduleName)} [${chalk.bold(number)}].`);
        this.modules[number].run(this).then(() => {
            this.runModule(++number);
        }, (err) => {
            if (this.modules[number].tolerance === 'required') {
                Logger.debug('Error:', err);
                return this._stop(new Error('Module execution failed.'));
            }

            this.runModule(++this.curretModuleIndex);
        });
    }

    _stop(err) {
        let _self = this;
        this.running = false;
        if (this.stopTime) {
            Logger.warn('Attempted to stop a video which has already stopped.')
            return;
        }
        this.stopTime = new Date();
        this.emit('stop', err);
        if (err) {
            Logger.error(`Video stopped processing with error: ${err.message}`);
            Logger.debug(err);
            this.emit('stopped', err);
            this.error = err;
            return;
        }
        let duration = moment.duration(moment(this.stopTime).diff(this.startTime), 'milliseconds').format('h:mm:ss.SSS', {
            trim: false
        });
        Logger.debug(`File output to ${chalk.bold(this.output.path)}.`);
        Promise.props({
            input: stat(_self.input.path),
            output: stat(_self.output.path),
        }).then((stats) => {
            let outputSize = fileSize(stats.output.size);
            let reductionPercent = (stats.output.size / stats.input.size * 100).toFixed(2);
            Logger.info(`Finished processing ${chalk.bold(this.input.base)} [${chalk.yellow(duration)}] [${chalk.yellow(outputSize)}] [${chalk.yellow(reductionPercent+'%')}].`);
        }).catch(err => {
            Logger.error(err.message);
        }).reflect().then(() => {
            this.emit('stopped');
        });

    }
    stop = this._stop;

    static getDuration(input, type = 'input') {
        return new Promise(function(resolve, reject) {
            if (typeof input === 'string') {
                return Video.calcDuration(input).then(resolve, reject);
            }
            if (input instanceof Video) {
                if (type === 'input') {
                    if (input.input.metadata[0].format.duration && !isNaN(input.input.metadata[0].format.duration))
                        return resolve(input.input.metadata[0].format.duration);

                    return Video.calcDuration(input.input.metadata[0].format.duration).then(resolve, reject);
                }
                if (type === 'output') {
                    if (input.output.metadata[0].format.duration && !isNaN(input.output.metadata[0].format.duration))
                        return resolve(input.output.metadata[0].format.duration);

                    return Video.calcDuration(input.output.metadata[0].format.duration).then(resolve, reject);
                }
            }

            reject(new Error('Unknown input type.'));
        });
    }

    static calcDuration(input) {
        return new Promise((resolve, reject) => {
            ffmpeg(input)
                .outputFormat('null')
                .output('-')
                .on('start', function(commandLine) {
                    Logger.trace('[FFMPEG] Query:', commandLine);
                })
                .on('error', function(err) {
                    reject(err);
                })
                .on('end', function(stdout, stderr) {
                    let lines = stderr.split('\n');
                    let lastTime = lines[lines.length - 3];
                    let duration = lastTime.match(new RegExp('time=(([0-9]|\:|\.)+) bitrate'))[1];
                    let seconds = moment.duration(duration).format("s", 6);
                    Logger.trace(`Duration manually calculated to ${seconds} second(s).`);
                    resolve(seconds);
                }).run();
        });
    }
}
