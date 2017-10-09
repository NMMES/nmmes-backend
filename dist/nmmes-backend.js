require("source-map-support").install();
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("chalk"), require("bluebird"), require("filesize"), require("fluent-ffmpeg"), require("fs"), require("lodash"), require("moment"), require("moment-duration-format"), require("path"), require("tracer"));
	else if(typeof define === 'function' && define.amd)
		define(["chalk", "bluebird", "filesize", "fluent-ffmpeg", "fs", "lodash", "moment", "moment-duration-format", "path", "tracer"], factory);
	else if(typeof exports === 'object')
		exports["nmmes-backend"] = factory(require("chalk"), require("bluebird"), require("filesize"), require("fluent-ffmpeg"), require("fs"), require("lodash"), require("moment"), require("moment-duration-format"), require("path"), require("tracer"));
	else
		root["nmmes-backend"] = factory(root["chalk"], root["bluebird"], root["filesize"], root["fluent-ffmpeg"], root["fs"], root["lodash"], root["moment"], root["moment-duration-format"], root["path"], root["tracer"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logger_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__logger__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return __WEBPACK_IMPORTED_MODULE_1__logger__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__module__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Module", function() { return __WEBPACK_IMPORTED_MODULE_2__module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__video__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Video", function() { return __WEBPACK_IMPORTED_MODULE_3__video__["a"]; });


process.on("unhandledRejection", function (reason) {
    __WEBPACK_IMPORTED_MODULE_0__logger_js__["a" /* default */].error('UNHANDLED ERROR:', reason);
});





/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tracer__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tracer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_tracer__);



const moduleRegex = /node_modules\/(.*?(?=\/))/;

const options = {
    format: "{{timestamp}} ({{method}}) [{{file}}:{{line}}] <{{title}}> {{message}}",
    dateformat: "HH:MM:ss.L",
    filters: [{
        trace: __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.magenta,
        debug: __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.blue,
        info: __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.green,
        warn: __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.yellow,
        error: __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.red
    }],
    preprocess: function (data) {
        data.title = data.title.toUpperCase();
        const matches = data.path.match(moduleRegex);
        data.file = matches && matches[1] ? `${matches[1]}>${data.file}` : data.file;
    },
    transport: data => {
        process.stdout.write(data.output + "\n");
    }
};

let logger = __WEBPACK_IMPORTED_MODULE_1_tracer___default.a.colorConsole(options);
logger.setLevel = level => {
    __WEBPACK_IMPORTED_MODULE_1_tracer___default.a.setLevel(level);
};
/* harmony default export */ __webpack_exports__["a"] = (logger);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chalk__);


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





class Module {
    constructor(info, options = {}) {
        this.tolerance = 'required';

        this.displayName = this.constructor.name;
        if (typeof info === 'undefined') {
            throw new Error(`Module ${this.displayName} must provide an info object.`);
        }

        if (info.nmmes.moduleVersion < 1) {
            __WEBPACK_IMPORTED_MODULE_0____["Logger"].warn(`Module ${this.displayName}\'s version [${info.nmmes.moduleVersion}] is lower than the required version [1].`);
        }

        this.info = info;
        Object.assign(this, {
            options
        });

        __WEBPACK_IMPORTED_MODULE_0____["Logger"].trace(`Module ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(this.displayName)} has been created with options:`, options);
    }

    attach(video) {
        if (this.video) throw new Error('Video already attacked');

        this.video = video;
    }

    run() {
        var _this = this;

        return _asyncToGenerator(function* () {
            if (typeof _this.executable !== 'function') throw new TypeError(`Module ${_this.displayName} must provide an executable class function.`);

            let results = yield _this.executable(Object.assign({}, _this.video.output.map));

            if (typeof results === 'undefined') __WEBPACK_IMPORTED_MODULE_0____["Logger"].warn(`Module ${_this.displayName} returned an undefined result.`);else if (typeof results !== 'object') throw new TypeError(`Module ${_this.displayName} returned a non object result.`);

            __WEBPACK_IMPORTED_MODULE_0____["Logger"].trace(`Module ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(_this.displayName)} has finished. Results:\n`, JSON.stringify(results));

            return results;
        })();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Module;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_filesize__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_filesize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_filesize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_path__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_bluebird__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_bluebird___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_bluebird__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





__webpack_require__(11);





const fs = __WEBPACK_IMPORTED_MODULE_5_bluebird___default.a.promisifyAll(__webpack_require__(8));
const ffmpeg = __WEBPACK_IMPORTED_MODULE_5_bluebird___default.a.promisifyAll(__webpack_require__(7));

class Video {
    constructor(options) {
        this.duration = {
            get input() {
                return !isNaN(this.input.metadata[0].format.duration) ? new Promise(resolve => resolve(this.input.metadata[0].format.duration)) : Video.calcDuration(this.input.path);
            },
            get output() {
                return !isNaN(this.output.metadata[0].format.duration) ? new Promise(resolve => resolve(this.output.metadata[0].format.duration)) : Video.calcDuration(this.output.path);
            }
        };

        __WEBPACK_IMPORTED_MODULE_0____["Logger"].debug(`Creating ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(__WEBPACK_IMPORTED_MODULE_4_path___default.a.basename(options.input.path))}.`);

        if (!options.input.path) throw new Error('options.input.path must be provided.');
        if (!options.output.path) throw new Error('options.output.path must be provided.');

        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_lodash__["merge"])(this, {
            strict: true,
            modules: [],
            input: _extends({}, __WEBPACK_IMPORTED_MODULE_4_path___default.a.parse(options.input.path), {
                map: {
                    streams: {},
                    format: {}
                }
            }),
            output: _extends({}, __WEBPACK_IMPORTED_MODULE_4_path___default.a.parse(options.output.path), {
                map: {
                    streams: {},
                    format: {}
                }
            })
        }, options);

        for (let module of this.modules) {
            module.attach(this);
        }

        __WEBPACK_IMPORTED_MODULE_0____["Logger"].trace('Video created:\n', this);
    }

    initialize() {
        var _this = this;

        return _asyncToGenerator(function* () {
            __WEBPACK_IMPORTED_MODULE_0____["Logger"].trace('Generating metadata for input...');

            let metadata = yield ffmpeg.ffprobeAsync(_this.input.path);

            // Lets do some metadata manipulation, I want the streams array as an
            // object
            metadata.streams = metadata.streams.reduce(function (obj, stream) {
                stream.input = 0;
                obj[stream.index] = stream;
                return obj;
            }, {});

            _this.input.metadata = {
                0: metadata
            };

            const streams = Object.values(metadata.streams);
            for (let pos in streams) {
                const stream = streams[pos];

                _this.output.map.streams[stream.index] = {
                    map: `${stream.input}:${stream.index}`,
                    ['metadata:s:' + pos]: [],
                    ['disposition:' + pos]: [],
                    vf: [],
                    af: []
                };
            }
            _this.initialized = true;

            return _this;
        })();
    }

    run() {
        var _this2 = this;

        return _asyncToGenerator(function* () {
            _this2.running = true;
            _this2.started = true;
            __WEBPACK_IMPORTED_MODULE_0____["Logger"].info(`Started processing ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(_this2.input.base)} -> ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(_this2.output.base)}.`);
            _this2.startTime = new Date();

            const moduleInitPromises = _this2.modules.reduce(function (array, module) {
                if (!module.init) return array;

                array.push(module.init());
                return array;
            }, []);

            yield Promise.all(moduleInitPromises);
            if (!_this2.initialized) yield _this2.initialize();

            try {
                for (const idx in _this2.modules) {
                    const module = _this2.modules[idx];
                    __WEBPACK_IMPORTED_MODULE_0____["Logger"].trace(`Running module ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(module.displayName)} [${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(idx)}].`);

                    let results = yield module.run(Object.assign({}, _this2.output.map));
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_lodash__["merge"])(_this2.output.map, results);
                }
            } catch (e) {
                _this2.stop(e);
            }

            return;
        })();
    }

    stop(err) {
        this.running = false;
        this.stopTime = new Date();

        if (err) {
            __WEBPACK_IMPORTED_MODULE_0____["Logger"].error(`Video stopped processing with error: ${err.message}`);
            __WEBPACK_IMPORTED_MODULE_0____["Logger"].debug(err);
            this.error = err;
            return;
        }
        let duration = __WEBPACK_IMPORTED_MODULE_2_moment___default.a.duration(__WEBPACK_IMPORTED_MODULE_2_moment___default()(this.stopTime).diff(this.startTime), 'milliseconds').format('h:mm:ss.SSS', {
            trim: false
        });
        __WEBPACK_IMPORTED_MODULE_0____["Logger"].debug(`File output to ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(this.output.path)}.`);

        let stats = Promise.all([fs.statAsync(this.input.path), fs.statAsync(this.output.path)]);

        let outputSize = __WEBPACK_IMPORTED_MODULE_3_filesize___default()(stats[1].size);
        let reductionPercent = (stats[1].size / stats[0].size * 100).toFixed(2);
        __WEBPACK_IMPORTED_MODULE_0____["Logger"].info(`Finished processing ${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.bold(this[0].base)} [${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.yellow(duration)}] [${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.yellow(outputSize)}] [${__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.yellow(reductionPercent + '%')}].`);
    }

    static calcDuration(input) {
        return new Promise((resolve, reject) => {
            ffmpeg(input).outputFormat('null').output('-').on('start', function (commandLine) {
                __WEBPACK_IMPORTED_MODULE_0____["Logger"].trace('[FFMPEG] Query:', commandLine);
            }).on('error', function (err) {
                reject(err);
            }).on('end', function (stdout, stderr) {
                let lines = stderr.split('\n');
                let lastTime = lines[lines.length - 3];
                let duration = lastTime.match(new RegExp('time=(([0-9]|\:|\.)+) bitrate'))[1];
                let seconds = __WEBPACK_IMPORTED_MODULE_2_moment___default.a.duration(duration).format("s", 6);
                __WEBPACK_IMPORTED_MODULE_0____["Logger"].trace(`Duration manually calculated to ${seconds} second(s).`);
                resolve(seconds);
            }).run();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Video;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("filesize");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fluent-ffmpeg");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("moment-duration-format");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("tracer");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
});
//# sourceMappingURL=nmmes-backend.js.map