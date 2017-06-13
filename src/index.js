import Promise from 'bluebird';
import Logger from './logger.js';
Promise.config({
    // Enable warnings
    warnings: true,
    // Enable long stack traces
    longStackTraces: true,
    // Enable cancellation
    cancellation: true,
    // Enable monitoring
    monitoring: false
});

process.on("unhandledRejection", function(reason) {
    Logger.error('UNHANDLED ERROR:', reason);
});

import Module from './module.js';
import Video from './video.js';
export {Module, Video, Logger};
