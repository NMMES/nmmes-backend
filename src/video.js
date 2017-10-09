'use strict';

import {
    Logger
} from './';

import chalk from 'chalk';
import moment from 'moment';
require("moment-duration-format");
import fileSize from 'filesize';
import Path from 'path';
import Bluebird from 'bluebird';
import {
    merge
} from 'lodash';

const fs = Bluebird.promisifyAll(require("fs"));
const ffmpeg = Bluebird.promisifyAll(require("fluent-ffmpeg"));

export default class Video {
    constructor(options) {
        Logger.debug(`Creating ${chalk.bold(Path.basename(options.input.path))}.`);

        if (!options.input.path)
            throw new Error('options.input.path must be provided.');
        if (!options.output.path)
            throw new Error('options.output.path must be provided.');

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

        for (let module of this.modules) {
            module.attach(this);
        }

        Logger.trace('Video created:\n', this);
    }

    async initialize() {
        Logger.trace('Generating metadata for input...');

        let metadata = await ffmpeg.ffprobeAsync(this.input.path);

        // Lets do some metadata manipulation, I want the streams array as an
        // object
        metadata.streams = metadata.streams.reduce((obj, stream) => {
            stream.input = 0;
            obj[stream.index] = stream;
            return obj;
        }, {});

        this.input.metadata = {
            0: metadata
        };

        const streams = Object.values(metadata.streams);
        for (let pos in streams) {
            const stream = streams[pos];

            this.output.map.streams[stream.index] = {
                map: `${stream.input}:${stream.index}`,
                ['metadata:s:' + pos]: [],
                ['disposition:' + pos]: [],
                vf: [],
                af: []
            };
        }
        this.initialized = true;

        return this;
    }

    async run() {
        this.running = true;
        this.started = true;
        Logger.info(`Started processing ${chalk.bold(this.input.base)} -> ${chalk.bold(this.output.base)}.`);
        this.startTime = new Date();

        const moduleInitPromises = this.modules.reduce((array, module) => {
            if (!module.init)
                return array;

            array.push(module.init());
            return array;
        }, []);

        await Promise.all(moduleInitPromises);
        if (!this.initialized)
            await this.initialize();

        try {
            for (const idx in this.modules) {
                const module = this.modules[idx];
                Logger.trace(`Running module ${chalk.bold(module.displayName)} [${chalk.bold(idx)}].`);

                let results = await module.run(Object.assign({}, this.output.map));
                merge(this.output.map, results);
            }
        } catch (e) {
            this.stop(e);
        }

        return;
    }

    stop(err) {
        this.running = false;
        this.stopTime = new Date();

        if (err) {
            Logger.error(`Video stopped processing with error: ${err.message}`);
            Logger.debug(err);
            this.error = err;
            return;
        }
        let duration = moment.duration(moment(this.stopTime).diff(this.startTime), 'milliseconds').format('h:mm:ss.SSS', {
            trim: false
        });
        Logger.debug(`File output to ${chalk.bold(this.output.path)}.`);

        let stats = Promise.all([fs.statAsync(this.input.path), fs.statAsync(this.output.path)]);

        let outputSize = fileSize(stats[1].size);
        let reductionPercent = (stats[1].size / stats[0].size * 100).toFixed(2);
        Logger.info(`Finished processing ${chalk.bold(this[0].base)} [${chalk.yellow(duration)}] [${chalk.yellow(outputSize)}] [${chalk.yellow(reductionPercent+'%')}].`);
    }

    duration = {
        get input() {
            return !isNaN(this.input.metadata[0].format.duration) ?
                new Promise(resolve => resolve(this.input.metadata[0].format.duration)) :
                Video.calcDuration(this.input.path)
        },
        get output() {
            return !isNaN(this.output.metadata[0].format.duration) ?
                new Promise(resolve => resolve(this.output.metadata[0].format.duration)) :
                Video.calcDuration(this.output.path)
        },
    };

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
