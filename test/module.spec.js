import chai from 'chai';
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;
import {
    Module,
    Video
} from '../src';
import Path from 'path';
import os from 'os';

suite('Module', function() {
    class TestModule extends Module {
        constructor() {
            super({
                name: 'nmmes-module-test-module'
            });
        }
        async init() {
            return;
        }
        async executable(map) {
            return {};
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
    suite('#init()', function() {
        test('should run init', async() => {
            assert.isFulfilled(testModule.init(), 'init failed');
        })
    });
    suite('#run(video, force = false, cache = true)', function() {
        test('should return an empty object', async() => {
            testModule.attach(video);
            let results = await testModule.run();
            assert.isEmpty(results);
        });
        test('should run executable', () => {
            assert.isFulfilled(testModule.executable(), 'executable failed')
        })

    });
});
