'use strict';

import Logger from './logger.js';
import chalk from 'chalk';
import Promise from 'bluebird';
import queryString from 'query-string';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import semver from 'semver';
import {
    NpmClient
} from 'npm-query';
import {
    EventEmitter
} from 'events';

export default class Module extends EventEmitter {
    provides = []
    tolerance = 'required'
    constructor(info, options = {}) {
        super();
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
    run(video, force = false, cache = true) {
        let _self = this;
        if (this.pending) {
            return this.pending;
        }
        if (video.moduleCache[createModuleQuery(this)] && video.moduleCache[createModuleQuery(this)].cache && !force) {
            return new Promise((resolve) => {
                Logger.debug(`Module cache hit: ${chalk.bold(_self.displayName)}'s results have been found in cache. Returning cached results.`);
                resolve(video.moduleCache[createModuleQuery(this)].cache);
            });
        }

        video.moduleCache[createModuleQuery(this)] = this;
        for (let name of this.provides) {
            video.moduleCache[createModuleQuery(module, name)] = module;
        }

        return this.execute(video, cache);
    }
    execute(video, cache) {
        let _self = this;
        return this.pending = new Promise((resolve, reject) => {

            // Make params immutable
            const Imap = video.strict && !_self.options.noStrict ? deepFreeze(cloneDeep(video.output.map)) : video.output.map;

            Logger.info(`Module ${chalk.bold(_self.displayName)} has started.`);

            video.emit('module-start', _self);
            _self.emit('start');

            let runModule = _self.executable(video, Imap);

            runModule.then((result = {}) => {
                video.emit('module-stop', _self);
                _self.emit('stop');
                Logger.trace(`Module ${chalk.bold(_self.displayName)} has finished. Results:\n`, JSON.stringify(result));

                video.output.map = merge(video.output.map, result);

                if (cache)
                    _self.cache = result;
                delete _self.pending;
                resolve(result);
            }, (err) => {
                video.emit('module-stop', _self, err);
                _self.emit('stop', err);
                _self.error = err;
                if (_self.tolerance === 'required') {
                    Logger.error(`Required module ${chalk.bold(_self.displayName)} failed: ${err.message}`);
                    Logger.debug(`Module ${chalk.bold(_self.displayName)} error:`, err);
                    return reject(err);
                } else if (_self.tolerance === 'optional') {
                    Logger.warn(`Optional module ${chalk.bold(_self.displayName)} failed: ${err.message}`);
                    Logger.debug(`Module ${chalk.bold(_self.displayName)} error:`, err);
                    return resolve();
                } else {
                    Logger.error(`Module ${chalk.bold(_self.displayName)} failed: ${err.message}`);
                    Logger.debug(`Module ${chalk.bold(_self.displayName)} error:`, err);
                    return reject(err);
                }
            });
            let stopHandler = (err) => {
                _self.emit('stop', err);
                runModule.cancel();
            };
            video.once('stop', stopHandler);
            _self.once('stop', () => {
                video.removeListener('stop', stopHandler);
            });
        });
    }
}

function createModuleQuery(module, name) {
    return name || module.displayName + '?' + queryString.stringify(module.args);
}

function deepFreeze(obj, depth = 0) {

    // Retrieve the property names defined on obj
    var propNames = Object.getOwnPropertyNames(obj);

    // Freeze properties before freezing self
    propNames.forEach(function(name) {
        var prop = obj[name];

        // Freeze prop if it is an object
        if (typeof prop == 'object' && prop !== null && depth < 6)
            deepFreeze(prop, ++depth);
    });

    // Freeze self (no-op if already frozen)
    return Object.freeze(obj);
}

export function checkForUpdates(modules) {
    let client = new NpmClient();

    // Convert module array to object
    let moduleMap = modules.reduce((obj, module) => {
        obj[module.info.name] = module;
        return obj;
    }, {});

    let queries = modules.reduce((obj, module) => {
        obj[module.info.name] = Promise.resolve(client.getModule(module.info.name)).reflect();
        return obj;
    }, {});

    Promise.props(queries).then((results) => {
        for (let [name, data] of Object.entries(results)) {
            if (data.isFulfilled()) {
                data = data.value();
                const latest = data['dist-tags'].latest;
                const current = moduleMap[name].info.version;
                if (semver.gt(latest, current)) {
                    Logger.warn(`Newer version of ${name}@${latest} available (current: ${current})`);
                }
            } else {
                data = data.reason();
                Logger.trace(`Could not check for a new version of ${chalk.bold(name)}. Error:`, data.message);
            }
        }
    });
}
