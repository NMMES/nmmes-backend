'use strict';
import Path from 'path';
import util from 'util';

import chalk from 'chalk';
import moment from 'moment';
require("moment-duration-format");
import fileSize from 'filesize';
import merge from 'lodash.merge';
import fs from 'fs-extra';
import ffmpeg from 'fluent-ffmpeg';
// import anitomy from 'anitomyjs';

import {
    Logger
} from './';

const ffprobe = util.promisify(ffmpeg.ffprobe);

function once(promise) {
    let resolved = false,
        _self = this;
    return async function() {
        if (resolved)
            return resolved;

        return resolved = promise.apply(_self, arguments);
    }
}

export default class Video {
    constructor(options, logger = Logger) {
        this.logger = logger;
        this.logger.debug(`Creating ${chalk.bold(Path.basename(options.input.path))}.`);

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
                    format: {
                        output: {},
                        input: {}
                    }
                }
            },
            output: { ...Path.parse(options.output.path),
                map: {
                    streams: {},
                    format: {
                        output: {},
                        input: {}
                    }
                }
            }
        }, options);

        for (let module of this.modules) {
            module.attach(this);
        }

        this.logger.trace('Video created:\n', this);
    }

    async _initializeOutput() {
        // this.output.anitomy = await Video.parseFilename(this.output.base);

        this.logger.trace('Generating metadata for output...');

        let metadata = await ffprobe(this.output.path);

        if (isNaN(metadata.format.duration)) {

            this.logger.trace('Invalid duration:', chalk.bold(metadata.format.duration));
            this.logger.debug(`Duration invalid, attempting to calculate manually...`);

            let duration = await Video._calcDuration(this.output.path);

            this.logger.debug(`Duration calculated to ${duration} second(s).`);
            metadata.format.duration = duration;
        }

        // Turn streams array into object indexed by stream index
        metadata.streams = metadata.streams.reduce((obj, stream) => {
            stream.input = 0;
            obj[stream.index] = stream;
            return obj;
        }, {});

        this.output.metadata = metadata;
    }

    async _initialize() {
        // this.input.anitomy = await Video.parseFilename(this.input.base);

        this.logger.trace('Generating metadata for input...');

        let metadata = await ffprobe(this.input.path);

        for (const stream of metadata.streams) {
            if (stream.codec_type === 'video') {
                metadata.format.video_codec = stream.codec_name;
                break;
            }
        }

        if (isNaN(metadata.format.duration)) {

            this.logger.trace('Invalid duration:', chalk.bold(metadata.format.duration));
            this.logger.debug(`Duration invalid, attempting to calculate manually...`);

            let duration = await Video._calcDuration(this.input.path);

            this.logger.debug(`Duration calculated to ${duration} second(s).`);
            metadata.format.duration = duration;
        }

        // Turn streams array into object indexed by stream index
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

        return this;
    };

    async run() {
        this.running = true;
        this.started = true;
        this.logger.info(`Started processing ${chalk.bold(this.input.base)} -> ${chalk.bold(this.output.base)}.`);
        this.startTime = new Date();

        await this._initialize();

        const moduleInitPromises = this.modules.reduce((array, module) => {
            if (!module.init)
                return array;

            array.push(module.init());
            return array;
        }, []);

        await Promise.all(moduleInitPromises);

        try {
            for (const idx in this.modules) {
                const module = this.modules[idx];
                this.logger.trace(`Running module ${chalk.bold(module.displayName)} [${chalk.bold(idx)}].`);

                let results = await module.run();
                merge(this.output.map, results);
            }
        } catch (e) {
            return this.stop(e);
        }

        return await this.stop();
    }

    async stop(err) {
        this.running = false;
        this.stopTime = new Date();

        if (err) {
            this.logger.error(`Video stopped processing with error: ${err.message}`);
            this.logger.debug(err);
            this.error = err;
            throw err;
        }
        let duration = this.duration = moment.duration(moment(this.stopTime).diff(this.startTime), 'milliseconds').format('h:mm:ss.SSS', {
            trim: false
        });

        if (!fs.existsSync(this.output.path)) {
            this.logger.warn('No output created.');
            return;
        }

        this.logger.debug(`File output to ${chalk.bold(this.output.path)}.`);

        let stats = await Promise.all([fs.stat(this.input.path), fs.stat(this.output.path)]);

        let outputSize = fileSize(stats[1].size);
        let reductionPercent = (stats[1].size / stats[0].size * 100).toFixed(2);
        this.logger.info(`Finished processing ${chalk.bold(this.input.base)} [${chalk.yellow(duration)}] [${chalk.yellow(outputSize)}] [${chalk.yellow(reductionPercent+'%')}].`);
    }

    static _calcDuration(input) {
        return new Promise((resolve, reject) => {
            ffmpeg(input)
                .outputFormat('null')
                .output('-')
                .on('error', function(err) {
                    reject(err);
                })
                .on('end', function(stdout, stderr) {
                    let lines = stderr.split('\n');
                    let lastTime = lines[lines.length - 3];
                    let duration = lastTime.match(new RegExp('time=(([0-9]|\:|\.)+) bitrate'))[1];
                    let seconds = moment.duration(duration).format("s", 6);
                    resolve(seconds);
                }).run();
        });
    }
    // static parseFilename(filename) {
    //     Logger.trace('Parsing', filename);
    //     return new Promise((resolve, reject) => {
    //         anitomy.parse(filename, function(elems) {
    //             return resolve(elems);
    //         });
    //     })
    // }
}
