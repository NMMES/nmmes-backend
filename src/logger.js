import chalk from 'chalk';
import tracer from 'tracer';

const moduleRegex = /nmmes-(.+(?=\/))/;

const options = {
    format: process.env.NMMES_DEBUG === 'true' ? "<{{title}}> {{timestamp}} ({{method}}) [{{file}}:{{line}}] {{message}}" : [
        "<{{title}}> {{message}}",
        {
            debug: "<{{title}}> {{timestamp}} [{{file}}:{{line}}] {{message}}",
            trace: "<{{title}}> {{timestamp}} ({{method}}) [{{file}}:{{line}}] {{message}}"
        }
    ],
    // TODO: Logging levels is totally broken with tracer, maybe we should switch to bunyan/winston?
    level: 'trace', // This needs to be trace because setLevel doesn't work with tracer
    methods: ['trace', 'debug', 'log', 'info', 'warn', 'error', 'fatal'],
    dateformat: "HH:MM:ss.L",
    filters: [{
        trace: chalk.magenta,
        debug: chalk.blue,
        log: chalk.white,
        info: chalk.green,
        warn: chalk.yellow,
        error: chalk.red
    }],
    preprocess: function(data) {
        data.title = data.title.toUpperCase();
        const matches = data.path.match(moduleRegex);
        data.file = matches && matches[1] ? `${matches[1]} > ${data.file}` : data.file;
    },
    transport: data => {
        process.stdout.write(data.output + "\n");
    }
};

let logger = tracer.colorConsole(options);
logger.setLevel = (level) => {
    tracer.setLevel(level);
    logger.info(`Log level changed to ${level}.`);
};
export default logger;
