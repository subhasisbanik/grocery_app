'use strict()';
const config = require('config');
const fs = require('fs');
const winston = require('winston');
const winstonDailyLogger = require('winston-daily-rotate-file');

class LogUtility{
    get logger(){
        return this._logger;
    }
    set logger(logger){
        this.logger = logger;
    }
    static initLog(){
        const logDirectory = config.get('Application.envConfig.logging.directory');
        if(!fs.existsSync(logDirectory)){
            fs.mkdirSync(logDirectory);
        }
        const tsFormat = ()=>(new Date()).toLocaleTimeString();
        const logFileName = logDirectory + config.get('Application.envConfig.logging.filename');
        let transport = new(winstonDailyLogger)({
            filename : logFileName,
            timestamp : tsFormat,
            datePattern : config.get('Application.envConfig.logging.datePattern'),
            handleExceptions: true,
            prepend : true,
            json : true,
            colorize : true
        });
        this._logger = winston.createLogger({
            level : process.env.ENV === config.get('Application.envConfig.logging.level'),
            transport : [transport]
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