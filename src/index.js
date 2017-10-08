import Logger from './logger.js';

process.on("unhandledRejection", function(reason) {
    Logger.error('UNHANDLED ERROR:', reason);
});

export {default as Logger} from './logger';
export {default as Module} from './module';
export {default as Video} from './video';
