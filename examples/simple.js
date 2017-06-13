#!/bin/env node

console.log('Running sample.js...');

const heAudio = require('h265ize-module-he-audio');
const encoder = require('h265ize-module-encoder');
const normalizer = require('h265ize-module-normalize');
const autocrop = require('h265ize-module-autocrop');
const stats = require('h265ize-module-stats');
const sample = require('h265ize-module-sample');

const h265ize = require('/tmp/h265ize-backend/dist.js');
// h265ize.Logger.setLevel('trace');

// let input = 'test/\'Sintel\' Trailer, Durian Open Movie Project.webm';
// let input = 'test/How\ to\ Post\ Uncropped\ Photos\ on\ Instagram.mp4';
let input = 'test/hale_bopp_1.mpg';
// let input = '/home/ayrton/Public/movies/Rise of the Planets of the Apes/Rise of the Planet of the Apes.mkv';

let output = '/tmp/h265ize-out/out.mkv'

let video = new h265ize.Video({
    name: 'test',
    input: {
        path: input
    },
    output: {
        path: output
    },

    // Module order matters, the encoder should usually be last
    modules: [new normalizer(), new heAudio(), new autocrop(), new encoder({
        defaults: {
            video: {
                'c:{POS}': 'libx265',
                'pixel_format': 'yuv420p10le'
            }
        }
    }), new stats(), new sample()]
});
video.start();
