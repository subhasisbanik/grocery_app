'use strict()';
var express = require('express');
var cors = require('cors');
var http = require('http');
var bodyParser = require('body-parser');
var config = require('config');
var helmet = require('helmet');
var logger = require('./adapter/loggingAdapter');

var app = express();

app.use(helmet());
//set port from cmd or use config provided values. can be used while running service in pm2
app.set('port',process.env.IDI_PORT||config.get('Application.envConfig.port'));
app.use(bodyParser.urlencoded({extended:true}));

//redefine handler for Content-Type: multipart/form-data - conditional use of body-parser
var parseJson = bodyParser.json();
app.use(function(req,res,next){
    let contentType = req.headers['content-type'];
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


//intializing winston logger
logger.initLog();

//Start the HTTP server
http.createServer(app).listen(app.get('port'), async function(){
    logger.info("HTTP Server running on port: " + app.get('port'));
    logger.debug("-----------------------------------------------");
})