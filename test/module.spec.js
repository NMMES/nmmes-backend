import {
    assert
} from 'chai';
import {
    Module,
    Logger,
    Video
} from '../src/index.js';
import {
    createModuleQuery
} from '../src/module.js';
import Path from 'path';
import os from 'os';
Logger.setLevel('warn');

suite('Module', function() {
    class TestModule extends Module {
        constructor() {
            super({
                name: 'nmmes-module-test-module'
            });
        }
        init() {
            return new Promise(function(resolve, reject) {
                resolve();
            });
        }
        executable(video, map) {
            let _self = this;
            return new Promise(function(resolve, reject) {
                _self.executableRan = true;
                resolve();
            });
        }
    }
    let testModule = new TestModule();
    let video = new Video({
        input: {
            path: 'test/nmmes-test-files/video/hale_bopp_1-(invalidCrop240p)-480p[yuv420p][mpeg1]-noadu-nosub.mpg'
        },
        output: {
            path: Path.resolve(os.tmpdir(), 'nmmes-backend-test.mkv')
        }
    });
    suite('#constructor(info, options = {})', function() {
        test('should return a module', function() {
            assert.instanceOf(testModule, Module, 'module is not an instance of Module');
        });
    });
    suite('#run(video, force = false, cache = true)', function() {
        let startEmitted = false,
            stopEmitted = false;
        testModule.once('start', () => startEmitted = true);
        testModule.once('stop', () => stopEmitted = true);
        test('should return an empty object', function(done) {
            testModule.run(video).then((result) => {
                done(assert.isEmpty(result))
            }, done);
        });
        test('should run init', (done) => {
            testModule.init(video).then(done, done);
        })
        test('should run executable', () => {
            assert.isTrue(testModule.executableRan, 'module did not run executableRan')
        })
        test('should emit start', function() {
            assert.isTrue(startEmitted, 'module did not emit start event');
        });
        test('should emit stop', function() {
            assert.isTrue(stopEmitted, 'module did not emit stop event');
        });

        test('is cached', function() {
            assert.exists(video.moduleCache[createModuleQuery(testModule)], 'module was not in video cache');
        });
    });
});
