import chalk from 'chalk';
import tracer from 'tracer';

const moduleRegex = /node_modules\/(.*?(?=\/))/;

const options = {
    format: "{{timestamp}} ({{method}}) [{{file}}:{{line}}] <{{title}}> {{message}}",
    dateformat: "HH:MM:ss.L",
    filters: [{
        trace: chalk.magenta,
        debug: chalk.blue,
        info: chalk.green,
        warn: chalk.yellow,
        error: chalk.red
    }],
    preprocess: function(data) {
        data.title = data.title.toUpperCase();
        const matches = data.path.match(moduleRegex);
        data.file = matches && matches[1] ? `${matches[1]}>${data.file}` : data.file;
    },
    transport: data => {
        process.stdout.write(data.output + "\n");
    }
};

let logger = tracer.colorConsole(options);
logger.setLevel = (level) => {
    logger.info(`Log level changed to ${level}.`);
    tracer.setLevel(level);
};
export default logger;
