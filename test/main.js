import Path from 'path';

import {
    Suite,
    Test,
    Runners, Reporters
} from 'universalis-tester';
import 'must/register';

import * as nmmes from '../';

const tests = [new Suite('Video', [
    new Test('should run to completion successfully', async function() {
        const input = Path.resolve(__dirname, './nmmes-test-files/video/sintel_trailer-(base)-480p[yuv420p][x264]-2ch[aac]-nosub.mp4');
        const output = '/tmp/nnmes-out.mkv'

        let video = new nmmes.Video({
            input: {
                path: input
            },
            output: {
                path: output
            },
        });
        nmmes.Logger.level = 0;
        await video.run();
    })
])];

let spec = new Reporters.Spec(new Runners.Default(tests));

spec.start();
