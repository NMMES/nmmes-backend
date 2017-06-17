import {
    assert
} from 'chai';
import {
    Module,
    Logger,
    Video
} from '../src/index.js';
import {createModuleQuery} from '../src/module.js';
Logger.setLevel('warn');

suite('Module', function() {
    class TestModule extends Module {
        constructor() {
            super({
                name: 'nmmes-module-test-module'
            });
        }
        executable(video, map) {
            return new Promise(function(resolve, reject) {
                resolve();
            });
        }
    }
    let testModule = new TestModule();
    let video = new Video({
        input: {
            path: '../examples/test/hale_bopp_1.mpg'
        },
        output: {
            path: '/tmp/nmmes-backend-test.mkv'
        }
    });
    suite('#constructor(info, options = {})', function() {
        test('should return a module', function() {
            assert.instanceOf(testModule, Module, 'module is not an instance of Module');
        });
    });
    suite('#run(video, force = false, cache = true)', function() {
        let startEmitted = false, stopEmitted = false;
        testModule.once('start', () => startEmitted = true);
        testModule.once('stop', () => stopEmitted = true);
        test('should return an empty object', function(done) {

            testModule.run(video).then((result) => {
                done(assert.isEmpty(result))
            }, done);
        });
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
