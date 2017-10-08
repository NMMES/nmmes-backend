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
        async executable(video, map) {
            return;
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
    suite('#constructor(options)', function() {
        test('should return a video', function() {
            assert.instanceOf(video, Video, 'video is not an instance of Video');
        });
    });
    suite('#run(video, force = false, cache = true)', () => {

        let startEmitted = false,
            stopEmitted = false;
        video.once('start', () => startEmitted = true);
        video.once('stopped', () => stopEmitted = true);
        test('should return an empty object', function(done) {
            video.once('stop', (err) => {
                done();
            });
            video.start();
        });
        test('should emit start', function() {
            assert.isTrue(startEmitted, 'module did not emit start event');
        });
        test('should emit stopped', function() {
            assert.isTrue(stopEmitted, 'module did not emit stop event');
        });
    });
});
