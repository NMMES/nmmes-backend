#!/bin/env node

console.log('Running sample.js...');

const nmmes = require('../nmmes-backend.js');
const encoder = require('nmmes-module-encoder');
// nmmes.Logger.setLevel('trace');

// let input = 'test/\'Sintel\' Trailer, Durian Open Movie Project.webm';
// let input = 'test/How\ to\ Post\ Uncropped\ Photos\ on\ Instagram.mp4';
let input = 'test/hale_bopp_1.mpg';
// let input = '/home/ayrton/Public/movies/Rise of the Planets of the Apes/Rise of the Planet of the Apes.mkv';

let output = '/tmp/nnmes-out.mkv'

let video = new nmmes.Video({
    input: {
        path: input
    },
    output: {
        path: output
    },

    // Module order matters, the encoder should usually be last
    modules: [new encoder({
        defaults: {
            video: {
                'c:{POS}': 'libx265',
                'pixel_format': 'yuv420p10le'
            }
        }
    })]
});
video.start();
