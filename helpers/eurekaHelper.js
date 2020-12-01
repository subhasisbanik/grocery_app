'use strict()';
const Eureka = require('eureka-js-client').Eureka;
const config = require('config');
var logger = require('../adapter/loggingAdapter');

class EurekaHelper{
    constructor(){
        //if(!EurekaHelper.instance){
            this.client = new Eureka({
                instance: config.get("Application.envConfig.Eureka.client"),
                eureka: config.get("Application.envConfig.Eureka.server"),
              });
        //}      
    }
    startClient(){
        this.client.start(error =>{
            if(error){
                logger.error("Error starting Eureka client");
                logger.error(error);
            }
            logger.info("Eureka Client started");
          });
    }
    stopClient(){
        this.client.stop(error =>{
            if(error){
                logger.error("Error stopping Eureka client");
                logger.error(error);
            }
            logger.info("Eureka Client stopped");
          })
    }  
}
module.exports = new EurekaHelper();