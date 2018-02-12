import chalk from 'chalk';
import tracer from 'tracer';

const moduleRegex = /nmmes-(.+(?=\/))/;

const options = {
    format: process.env.NODE_ENV === 'development' ? "<{{title}}> {{timestamp}} ({{method}}) [{{file}}:{{line}}] {{message}}" : [
        "<{{title}}> {{message}}",
        {
            debug: " <{{title}}>{{timestamp}} [{{file}}:{{line}}] {{message}}",
            trace: " <{{title}}>{{timestamp}} ({{method}}) [{{file}}:{{line}}] {{message}}"
        }
    ],
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
        data.file = matches && matches[1] ? `${matches[1]} > ${data.file}` : data.file;
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
