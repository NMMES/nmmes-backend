'use strict';

import {
    Logger
} from './';

import chalk from 'chalk';

export default class Module {
    tolerance = 'required';
    constructor(info, options = {}) {
        this.displayName = this.constructor.name;
        if (typeof info === 'undefined') {
            throw new Error(`Module ${this.displayName} must provide an info object.`);
        }

        this.info = info;
        Object.assign(this, {
            options
        });

        Logger.trace(`Module ${chalk.bold(this.displayName)} has been created with options:`, options);
    }

    attach(video) {
        if (this.video)
            throw new Error('Video already attacked');

        this.video = video;
    }

    async run() {
        if (typeof this.executable !== 'function')
            throw new TypeError(`Module ${this.displayName} must provide an executable class function.`)

        let results = await this.executable(Object.assign({}, this.video.output.map));

        Logger.trace(`Module ${chalk.bold(this.displayName)} has finished. Results:\n`, JSON.stringify(results));

        return results;
    }
}
