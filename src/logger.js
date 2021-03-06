import chalk from 'chalk';
import tracer from 'nmmes-tracer';
const moduleRegex = /nmmes-(.+(?=\/))/;

export default new tracer.Logger({
    levels: ['trace', 'debug', 'log', 'info', 'warn', 'error', 'fatal'],
    level: process.env.NMMES_DEBUG === 'true'? 'trace' : 'log',
    format: process.env.NMMES_DEBUG === 'true' ? "<{{=it.title}}> {{=it.timestamp}} ({{=it.method}}) [{{=it.file}}:{{=it.line}}] {{=it.message}}" : ["<{{=it.title}}> {{=it.message}}",
        {
            debug: "<{{=it.title}}> {{=it.timestamp}} [{{=it.file}}:{{=it.line}}] {{=it.message}}",
            trace: "<{{=it.title}}> {{=it.timestamp}} ({{=it.method}}) [{{=it.file}}:{{=it.line}}] {{=it.message}}"
        }
    ],
    preprocessor: (data, ops) => {
        data.title = data.title.toUpperCase();
        const matches = data.path.match(moduleRegex);
        data.file = matches && matches[1] ? `${matches[1]} > ${data.file}` : data.file;
        return [data, ops];
    },
    dateformat: "HH:MM:ss",
    filters: {
        trace: chalk.magenta,
        debug: chalk.blue,
        log: chalk.white,
        info: chalk.green,
        warn: chalk.yellow,
        error: chalk.red
    },
    transports: [new tracer.transports.Console()]
});
