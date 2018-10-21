'use strict';
import chalk from 'chalk';

import {
    Logger
} from './';

export default class Module {
    constructor(info, options = {}, logger) {
        this.logger = logger ? logger : Logger;
        this.displayName = this.constructor.name;
        if (typeof info === 'undefined') {
            throw new Error(`Module ${this.displayName} must provide an info object.`);
        }

        this.info = info;
        Object.assign(this, {
            tolerance: 'required',
            ...options
        });

        this.logger.trace(`Module ${chalk.bold(this.displayName)} has been created with options:`, options);
    }

    attach(video) {
        if (this.video)
            throw new Error('Video already attached.');

        this.video = video;
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
