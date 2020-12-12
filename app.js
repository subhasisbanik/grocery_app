'use strict()';
var express = require('express');
var cors = require('cors');
var http = require('http');
var bodyParser = require('body-parser');
const config = require('config');
var helmet = require('helmet');
var logger = require('./adapter/loggingAdapter');
//var EurekaHelper = require('./helpers/eurekaHelper');
const jwt = require("jsonwebtoken");
var app = express();

app.use(helmet());
//set port from cmd or use config provided values. can be used while running service in pm2
app.set('port',process.env.IDI_PORT||config.get('Application.envConfig.port'));
app.use(bodyParser.urlencoded({extended:true}));

//redefine handler for Content-Type: multipart/form-data - conditional use of body-parser
var parseJson = bodyParser.json();
app.use(function(req,res,next){
    let contentType = req.headers['content-type'];
    // let authHeader = req.headers['authorization'];
    // let token = authHeader && authHeader.split(' ')[1];
    // if (token == null) return res.sendStatus(401) // if there isn't any token

    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //     console.log(err)
    //     if (err) return res.sendStatus(403)
    //     req.user = user
    //     //next() // pass the execution off to whatever request the client intended
    //     parseJson(req,res,next);
    //   })

    if(undefined != contentType && contentType.includes('multipart/form-data')){
        next();
    }else{
        parseJson(req,res,next);
    }
});

//enable pre-flight
app.options('*', cors());

//enable all cors request
app.use(cors());

//controller registration
app.use(require('./controllers'));


//intializing winston logger for app.js
logger.initLog("app.js");

//Start the HTTP server
http.createServer(app).listen(app.get('port'), async function(){
    logger.info("HTTP Server running on port: " + app.get('port'));
    logger.info("-----------------------------------------------");    
    logger.info("Trying to start Eureka client");
    //EurekaHelper.startClient();
});

process.on('exit', function() {
    logger.info("Caught exit signal");
    logger.info("Trying to stop Eureka client");
    EurekaHelper.stopClient();
    process.exit();
  });

process.on('SIGINT', function() {
    logger.info("Caught interrupt signal");
    logger.info("Trying to stop Eureka client");
    EurekaHelper.stopClient();
    process.exit();
});