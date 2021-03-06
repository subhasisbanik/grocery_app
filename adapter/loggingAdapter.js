'use strict()';
const config = require('config');
const fs = require('fs');
require('winston-daily-rotate-file');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

class LogUtility{
    get logger(){
        return this._logger;
    }
    set logger(logger){
        this.logger = logger;
    }
    //TODO: change the label based on class
    
    static initLog(label){
        const logDirectory = config.get('Application.envConfig.logging.directory');
        if(!fs.existsSync(logDirectory)){
            fs.mkdirSync(logDirectory);
        }
        const myFormat = printf(({ level, message, timestamp }) => {
            return `${timestamp} [${label}] ${level}: ${message}`;
          });
        const logFileName = logDirectory + config.get('Application.envConfig.logging.filename');
        let transport = new transports.DailyRotateFile({
            filename : logFileName,
            format: combine(timestamp(), myFormat),
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        });
        console.log(process.env.ENV);
        this._logger = createLogger({
            level : process.env.ENV === config.get('Application.envConfig.logging.level'),
            transports : [ transport, 
                new transports.Console({
                    level: config.get('Application.envConfig.logging.level'),
                    format: format.combine(format.colorize(), timestamp(), myFormat)
                  })
                 ]
        });
    }
    
    static error(message){
        this._logger.error(message);
    }

    static warn(message){
        this._logger.warn(message);
    }

    static info(message){
        this._logger.info(message);
    }

    static debug(message){
        this._logger.debug(message);
    }

    static verbose(message){
        this._logger.verbose(message);
    }

    static silly(message){
        this._logger.silly(message);
    }
}

module.exports = LogUtility;