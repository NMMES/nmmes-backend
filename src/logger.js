import chalk from 'chalk';
import tracer from 'tracer';

const options = {
    format: [
        "[{{title}}] {{message}}",
        {
            trace: "[{{title}}] {{message}}\n\t({{method}} in {{path}}:{{line}})",
            debug: "[{{title}}] {{message}} ({{method}})",
        }
    ],
    filters: [{
        trace: chalk.magenta,
        debug: chalk.blue,
        info: chalk.green,
        warn: chalk.yellow,
        error: chalk.red
    }],
    dateformat: "HH:MM:ss.L",
    preprocess: function(data) {
        data.title = data.title.toUpperCase();
    },
    transport: function(data) {
        if (logger.stream) {
            logger.stream.write(data.output + "\n");
        } else {
            console.log(data.output);
        }
    }
}

let logger = tracer.colorConsole(options);
logger.setLevel = (level) => {
    tracer.setLevel(level);
};
export default logger;
