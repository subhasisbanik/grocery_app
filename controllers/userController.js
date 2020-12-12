'use strict()';
const express = require('express');
const router  = express.Router();
//const UserService = require('../services/userService');
const JWTService = require('../services/jwtService');
const Utils = require('../utils/utils.js');
const logger = require('../adapter/loggingAdapter');

//authenticate user and return JWT token
router.post('/login/authenticate', async function(req,res){
    var response, respStatus, username; 
    try{
        var body = Utils.checkNull(req.body);
        username = Utils.checkNull(body.username);
        Utils.checkNull(body.password);
        //check username and password from DB
        //UserService.getUserData()

        var tokenCookie = await new JWTService().sign({username});
        logger.info(tokenCookie);
        res.json(tokenCookie);
    }catch(e){
       response = "Incorrect paramters";
       logger.error("Unauthorized user:"+e);
       respStatus = 401;
       res.status(respStatus).send(response);
    }    
});

router.post('/login', async function(req,res){
    var response, respStatus, username, jwtToken; 
    try{
        var body = Utils.checkNull(req.body);
        username = Utils.checkNull(body.username);
        //check username and password from DB
        //UserService.getUserData()

        jwtToken = Utils.checkNull(req.headers.authorization.split(" ")[1]);
        var decodedToken = await new JWTService().verify(jwtToken);
        logger.info(decodedToken);
        res.json(decodedToken);
    }catch(e){
       response = "Incorrect paramters";
       logger.error("Unauthorized user:"+e);
       respStatus = 401;
       res.status(respStatus).send(response);
    }    
});

module.exports = router;