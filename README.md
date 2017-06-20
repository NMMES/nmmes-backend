# NMMES-backend

The NMMES backend is the processing portion of the NMMES family. It provides a node API for applications to encode media using a set of modules.

### Dependencies

- [Node.js](https://nodejs.org/en/) - Required in order to run h265ize.
- [NPM](https://www.npmjs.com/) - (Usually packaged with Node.js) Required in order to install h265ize.
- [ffmpeg](https://ffmpeg.org/) - Does the video conversion among other things.

### Installation
[![NPM](https://nodei.co/npm/nmmes-backend.png?compact=true)](https://nodei.co/npm/nmmes-backend/)

### Usage
In order to use this example you must also install the encoder module `nmmes-module-encoder`.
```javascript
// import * as NMMES from 'nmmes-backend';
// import encoder from 'nmmes-module-encoder';
const NMMES = require('nmmes-backend');
const encoder = require('nmmes-module-encoder');

let video = new NMMES.Video({
    input: {
        path: '/home/user/videos/video.mp4'
    },
    output: {
        path: '/home/user/videos/encoded-video.mkv'
    },
    modules: [new encoder({
        defaults: {
            video: {
                'c:{POS}': 'libx265'
            }
        }
    })]
});

video.on('stop', function(err) {
    if (err)
        return NMMES.Logger.error('Error encoding video', err);

    NMMES.Logger.log('Video encoding complete.');
});

video.start();
```

### Contributing
See the wiki entry [here](https://github.com/NMMES/nmmes-backend/wiki/Contributing).
