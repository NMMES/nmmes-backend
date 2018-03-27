'use strict';

import {
    Logger
} from './';

import semver from 'semver';
import chalk from 'chalk';

export default class Module {
    tolerance = 'required';
    static MODULE_VERSION = 0;
    static options = {};
    constructor(info, options = {}, logger = Logger) {
        this.logger = logger;
        this.displayName = this.constructor.name;
        if (typeof info === 'undefined') {
            throw new Error(`Module ${this.displayName} must provide an info object.`);
        }

        if (!semver.satisfies(info.version, `${Module.MODULE_VERSION}.x`)) {
            this.logger.warn(`Module ${this.displayName}\'s system version [${info.version}] is not compatible with system version [${Module.MODULE_VERSION}].`);
        }

        this.info = info;
        Object.assign(this, {
            options
        });

        this.logger.trace(`Module ${chalk.bold(this.displayName)} has been created with options:`, options);
    }

    attach(video) {
        if (this.video)
            throw new Error('Video already attached.');

        this.video = video;
        this.logger = this.video.logger;
    }

    async run() {
        if (typeof this.executable !== 'function')
            throw new TypeError(`Module ${this.displayName} must provide an executable class function.`);
        let results = await this.executable(Object.assign({}, this.video.output.map));

        if (typeof results === 'undefined')
            this.logger.warn(`Module ${this.displayName} returned an undefined result.`)
        else if (typeof results !== 'object')
            throw new TypeError(`Module ${this.displayName} returned a non object result.`);

        this.logger.trace(`Module ${chalk.bold(this.displayName)} has finished. Results:\n`, JSON.stringify(results));

        return results;
    }

    static defaults(moduleClass) {
        let defaults = {};
        for (const [key, val] of Object.entries(moduleClass.options())) {
            if (typeof val.default !== 'undefined')
                defaults[key] = val.default;
        }
        return defaults;
    }
}
