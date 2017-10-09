import chai from 'chai';
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;
import {
    Module,
    Logger,
    Video
} from '../src/index.js';
import Path from 'path';
import os from 'os';
Logger.setLevel('trace');

suite('Video', function() {
    class TestModule extends Module {
        constructor() {
            super({
                name: 'nmmes-module-test-module'
            });
        }
        async executable(map) {
            return {};
        }
    }
    let testModule = new TestModule();
    let video = new Video({
        modules: [testModule],
        input: {
            path: 'test/nmmes-test-files/video/hale_bopp_1-(invalidCrop240p)-480p[yuv420p][mpeg1]-noadu-nosub.mpg'
        },
        output: {
            path: Path.resolve(os.tmpdir(), 'nmmes-backend-test.mkv')
        }
    });
    suite('#constructor(options)', function() {
        test('should return a video', function() {
            assert.instanceOf(video, Video, 'video is not an instance of Video');
        });
    });
    suite('#initialize()', () => {
        test('should create video.input[0].metadata', async() => {
            await video.initialize();
            assert.isOk(video.input.metadata[0], 'metadata does not exist');
        });
        test('should create stream maps with mandatory key:value pairs', async() => {
            await video.initialize();
            for (let [streamIdx, stream] of Object.entries(video.output.map.streams)) {
                assert.property(stream, 'map');
                assert.deepInclude(stream, {
                    ['metadata:s:' + streamIdx]: [],
                    ['disposition:' + streamIdx]: [],
                    vf: [],
                    af: []
                }, 'does not have matching ');
            }
        });
    });
    suite('#run(video, force = false, cache = true)', () => {
        test('should return', async() => {
            assert.isFulfilled(video.run(), 'run failed');
        });
    });
});
