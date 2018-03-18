#!/bin/env node

console.log('Running sample.js...');

const nmmes = require('../dist/nmmes-backend.js');
// nmmes.Logger.setLevel('trace');

// let input = 'test/\'Sintel\' Trailer, Durian Open Movie Project.webm';
// let input = 'test/How\ to\ Post\ Uncropped\ Photos\ on\ Instagram.mp4';
let input = 'test/nmmes-test-files/video/sintel_trailer-(base)-480p[yuv420p][x264]-2ch[aac]-nosub.mp4';
// let input = '/home/ayrton/Public/movies/Rise of the Planets of the Apes/Rise of the Planet of the Apes.mkv';

let output = '/tmp/nnmes-out.mkv'

let video = new nmmes.Video({
    input: {
        path: input
    },
    output: {
        path: output
    },
});
nmmes.Logger.level = 0;
video.run();
