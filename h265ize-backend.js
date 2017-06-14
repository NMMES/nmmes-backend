require("source-map-support").install();
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("bluebird"), require("chalk"), require("events"), require("fluent-ffmpeg"), require("lodash"), require("lodash/cloneDeep"), require("lodash/merge"), require("moment"), require("moment-duration-format"), require("npm-query"), require("path"), require("query-string"), require("semver"), require("tracer"));
	else if(typeof define === 'function' && define.amd)
		define(["bluebird", "chalk", "events", "fluent-ffmpeg", "lodash", "lodash/cloneDeep", "lodash/merge", "moment", "moment-duration-format", "npm-query", "path", "query-string", "semver", "tracer"], factory);
	else if(typeof exports === 'object')
		exports["h265ize-backend"] = factory(require("bluebird"), require("chalk"), require("events"), require("fluent-ffmpeg"), require("lodash"), require("lodash/cloneDeep"), require("lodash/merge"), require("moment"), require("moment-duration-format"), require("npm-query"), require("path"), require("query-string"), require("semver"), require("tracer"));
	else
		root["h265ize-backend"] = factory(root["bluebird"], root["chalk"], root["events"], root["fluent-ffmpeg"], root["lodash"], root["lodash/cloneDeep"], root["lodash/merge"], root["moment"], root["moment-duration-format"], root["npm-query"], root["path"], root["query-string"], root["semver"], root["tracer"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__, __WEBPACK_EXTERNAL_MODULE_18__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tracer__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tracer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_tracer__);



const options = {
    format: ["[{{title}}] {{message}}", {
        trace: "[{{title}}] {{message}}\n\t({{method}} in {{path}}:{{line}})",
        debug: "[{{title}}] {{message}} ({{method}})"
    }],
    filters: [{
        trace: __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.magenta,
        debug: __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.blue,
        info: __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.green,
        warn: __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.yellow,
        error: __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.red
    }],
    dateformat: "HH:MM:ss.L",
    preprocess: function (data) {
        data.title = data.title.toUpperCase();
    },
    transport: function (data) {
        if (logger.stream) {
            logger.stream.write(data.output + "\n");
        } else {
            console.log(data.output);
        }
    }
};

let logger = __WEBPACK_IMPORTED_MODULE_1_tracer___default.a.colorConsole(options);
logger.setLevel = level => {
    __WEBPACK_IMPORTED_MODULE_1_tracer___default.a.setLevel(level);
};
/* harmony default export */ __webpack_exports__["a"] = (logger);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* unused harmony export checkForUpdates */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_query_string__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_query_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_query_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_cloneDeep__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_cloneDeep___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash_cloneDeep__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_merge__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_semver__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_semver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_semver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_npm_query__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_npm_query___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_npm_query__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_events__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_events__);












class Module extends __WEBPACK_IMPORTED_MODULE_8_events__["EventEmitter"] {
    constructor(info, options = {}) {
        super();
        this.provides = [];
        this.tolerance = 'required';
        this.displayName = this.constructor.name;
        if (typeof info === 'undefined') {
            throw new Error(`Module ${this.displayName} must provide an info object.`);
        }
        this.info = info;
        Object.assign(this, {
            options
        });

        __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].trace(`Module ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(this.displayName)} has been created with options:`, options);
    }
    run(video, force = false, cache = true) {
        let _self = this;
        if (this.pending) {
            return this.pending;
        }
        if (video.moduleCache[createModuleQuery(this)] && video.moduleCache[createModuleQuery(this)].cache && !force) {
            return new __WEBPACK_IMPORTED_MODULE_2_bluebird___default.a(resolve => {
                __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].debug(`Module cache hit: ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(_self.displayName)}'s results have been found in cache. Returning cached results.`);
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
        return this.pending = new __WEBPACK_IMPORTED_MODULE_2_bluebird___default.a((resolve, reject) => {

            // Make params immutable
            const Imap = video.strict && !_self.options.noStrict ? deepFreeze(__WEBPACK_IMPORTED_MODULE_4_lodash_cloneDeep___default()(video.output.map)) : video.output.map;

            __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].info(`Module ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(_self.displayName)} has started.`);

            video.emit('module-start', _self);
            _self.emit('start');

            let runModule = _self.executable(video, Imap);

            runModule.then((result = {}) => {
                video.emit('module-stop', _self);
                _self.emit('stop');
                __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].trace(`Module ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(_self.displayName)} has finished. Results:\n`, JSON.stringify(result));

                video.output.map = __WEBPACK_IMPORTED_MODULE_5_lodash_merge___default()(video.output.map, result);

                if (cache) _self.cache = result;
                delete _self.pending;
                resolve(result);
            }, err => {
                video.emit('module-stop', _self, err);
                _self.emit('stop', err);
                _self.error = err;
                if (_self.tolerance === 'required') {
                    __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].error(`Required module ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(_self.displayName)} failed: ${err.message}`);
                    __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].debug(`Module ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(_self.displayName)} error:`, err);
                    return reject(err);
                } else if (_self.tolerance === 'optional') {
                    __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].warn(`Optional module ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(_self.displayName)} failed: ${err.message}`);
                    __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].debug(`Module ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(_self.displayName)} error:`, err);
                    return resolve();
                } else {
                    __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].error(`Module ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(_self.displayName)} failed: ${err.message}`);
                    __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].debug(`Module ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(_self.displayName)} error:`, err);
                    return reject(err);
                }
            });
            let stopHandler = err => {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Module;


function createModuleQuery(module, name) {
    return name || module.displayName + '?' + __WEBPACK_IMPORTED_MODULE_3_query_string___default.a.stringify(module.args);
}

function deepFreeze(obj, depth = 0) {

    // Retrieve the property names defined on obj
    var propNames = Object.getOwnPropertyNames(obj);

    // Freeze properties before freezing self
    propNames.forEach(function (name) {
        var prop = obj[name];

        // Freeze prop if it is an object
        if (typeof prop == 'object' && prop !== null && depth < 6) deepFreeze(prop, ++depth);
    });

    // Freeze self (no-op if already frozen)
    return Object.freeze(obj);
}

function checkForUpdates(modules) {
    let client = new __WEBPACK_IMPORTED_MODULE_7_npm_query__["NpmClient"]();

    // Convert module array to object
    let moduleMap = modules.reduce((obj, module) => {
        obj[module.info.name] = module;
        return obj;
    }, {});

    let queries = modules.reduce((obj, module) => {
        obj[module.info.name] = __WEBPACK_IMPORTED_MODULE_2_bluebird___default.a.resolve(client.getModule(module.info.name)).reflect();
        return obj;
    }, {});

    __WEBPACK_IMPORTED_MODULE_2_bluebird___default.a.props(queries).then(results => {
        for (let [name, data] of Object.entries(results)) {
            if (data.isFulfilled()) {
                data = data.value();
                const latest = data['dist-tags'].latest;
                const current = moduleMap[name].info.version;
                if (__WEBPACK_IMPORTED_MODULE_6_semver___default.a.gt(latest, current)) {
                    __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].warn(`Newer version of ${name}@${latest} available (current: ${current})`);
                }
            } else {
                data = data.reason();
                __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].trace(`Could not check for a new version of ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(name)}. Error:`, data.message);
            }
        }
    });
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(7)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logger_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__module_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__video_js__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Module", function() { return __WEBPACK_IMPORTED_MODULE_2__module_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Video", function() { return __WEBPACK_IMPORTED_MODULE_3__video_js__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return __WEBPACK_IMPORTED_MODULE_1__logger_js__["a"]; });


__WEBPACK_IMPORTED_MODULE_0_bluebird___default.a.config({
    // Enable warnings
    warnings: true,
    // Enable long stack traces
    longStackTraces: true,
    // Enable cancellation
    cancellation: true,
    // Enable monitoring
    monitoring: false
});

process.on("unhandledRejection", function (reason) {
    __WEBPACK_IMPORTED_MODULE_1__logger_js__["a" /* default */].error('UNHANDLED ERROR:', reason);
});





/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_events__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fluent_ffmpeg__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fluent_ffmpeg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fluent_ffmpeg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bluebird__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__module_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_path__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__logger_js__ = __webpack_require__(0);


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





__webpack_require__(13);







class Video extends __WEBPACK_IMPORTED_MODULE_1_events___default.a {
    constructor(options) {
        __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].debug(`Creating ${__WEBPACK_IMPORTED_MODULE_0_chalk___default.a.bold(__WEBPACK_IMPORTED_MODULE_7_path___default.a.basename(options.input.path))}.`);

        if (!options.input.path) throw new Error('options.input.path must be provided.');
        if (!options.output.path) throw new Error('options.output.path must be provided.');

        super();

        this.curretModuleIndex = 0;
        this.moduleCache = {};
        this.stop = this._stop;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_lodash__["merge"])(this, {
            strict: true,
            input: _extends({}, __WEBPACK_IMPORTED_MODULE_7_path___default.a.parse(options.input.path), {
                map: {
                    streams: {},
                    format: {}
                }
            }),
            output: _extends({}, __WEBPACK_IMPORTED_MODULE_7_path___default.a.parse(options.output.path), {
                map: {
                    streams: {},
                    format: {}
                }
            })
        }, options);

        // checkForUpdates(this.modules);

        __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].trace('Video created:\n', this);
    }
    initialized() {
        let _self = this;
        return new __WEBPACK_IMPORTED_MODULE_4_bluebird___default.a((resolve, reject) => {
            __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].trace('Generating metadata for input...');
            __WEBPACK_IMPORTED_MODULE_2_fluent_ffmpeg___default.a.ffprobe(_self.input.path, function (err, metadata) {
                if (err) return reject(err);

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
                        ['disposition:' + pos]: []
                    };
                }

                if (isNaN(metadata.format.duration)) {
                    __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].trace('Invalid duration:', __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.bold(metadata.format.duration));
                    __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].debug(`Duration invalid, attempting to calculate manually...`);
                    calcDuration(_self.input.path).then(duration => {
                        __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].debug(`Duration calculated to ${duration} second(s).`);
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
        this.emit('start');
        __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].info(`Started processing ${__WEBPACK_IMPORTED_MODULE_0_chalk___default.a.bold(this.input.base)}.`);
        this.startTime = new Date();

        return new __WEBPACK_IMPORTED_MODULE_4_bluebird___default.a((resolve, reject) => {
            // Run module init
            __WEBPACK_IMPORTED_MODULE_4_bluebird___default.a.all(this.modules.reduce((array, module) => {
                if (!module.init) return array;
                array.push(new __WEBPACK_IMPORTED_MODULE_4_bluebird___default.a((resolve, reject) => {
                    module.init(_self).then(resolve, err => {
                        __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].error(`Module ${__WEBPACK_IMPORTED_MODULE_0_chalk___default.a.bold(module.displayName)} initialization failed: ${err.message}`);
                        __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].debug('Error:', err);
                        reject(new Error('Module initialization failed.'));
                    });
                }));
                return array;
            }, [])).then(this.initialized.bind(this)).then(resolve).return(0).then(this.runModule.bind(this), err => {
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
        if (this.stopTime) return;
        const moduleName = this.modules[number].displayName;
        __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].trace(`Running module ${__WEBPACK_IMPORTED_MODULE_0_chalk___default.a.bold(moduleName)} [${__WEBPACK_IMPORTED_MODULE_0_chalk___default.a.bold(number)}].`);
        this.modules[number].run(this).then(() => {
            this.runModule(++number);
        }, err => {
            if (this.modules[number].tolerance === 'required') {
                __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].debug('Error:', err);
                return this._stop(new Error('Module execution failed.'));
            }

            this.runModule(++this.curretModuleIndex);
        });
    }

    _stop(err) {
        if (this.stopTime) {
            __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].warn('Attempted to stop a video which has already stopped.');
            return;
        }
        this.stopTime = new Date();
        this.emit('stop', err);
        if (err) {
            __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].error(`Video stopped processing with error: ${err.message}`);
            __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].debug(err);
            this.emit('stopped', err);
            this.error = err;
            return;
        }
        let duration = __WEBPACK_IMPORTED_MODULE_3_moment___default.a.duration(__WEBPACK_IMPORTED_MODULE_3_moment___default()(this.stopTime).diff(this.startTime), 'milliseconds').format('h:mm:ss.SSS', {
            trim: false
        });
        __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].info(`Finished processing ${__WEBPACK_IMPORTED_MODULE_0_chalk___default.a.bold(this.input.base)} [${__WEBPACK_IMPORTED_MODULE_0_chalk___default.a.yellow(duration)}].`);
        this.emit('stopped');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Video;


function calcDuration(input) {
    return new __WEBPACK_IMPORTED_MODULE_4_bluebird___default.a((resolve, reject) => {
        __WEBPACK_IMPORTED_MODULE_2_fluent_ffmpeg___default()(input).outputFormat('null').output('-').on('start', function (commandLine) {
            __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].trace('[FFMPEG] Query:', commandLine);
        }).on('error', function (err) {
            reject(err);
        }).on('end', function (stdout, stderr) {
            let lines = stderr.split('\n');
            let lastTime = lines[lines.length - 3];
            let duration = lastTime.match(new RegExp('time=(([0-9]|\:|\.)+) bitrate'))[1];
            let seconds = __WEBPACK_IMPORTED_MODULE_3_moment___default.a.duration(duration).format("s", 6);
            __WEBPACK_IMPORTED_MODULE_8__logger_js__["a" /* default */].trace(`Duration manually calculated to ${seconds} second(s).`);
            resolve(seconds);
        }).run();
    });
}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fluent-ffmpeg");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("lodash/cloneDeep");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("lodash/merge");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("moment-duration-format");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("npm-query");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("query-string");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("semver");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("tracer");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ })
/******/ ]);
});
//# sourceMappingURL=h265ize-backend.js.map