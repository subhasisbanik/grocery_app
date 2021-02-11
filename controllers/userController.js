'use strict()';
const express = require('express');
const router  = express.Router();
//const UserService = require('../services/userService');
const JWTService = require('../services/jwtService');
const UserService = require('../services/userService');
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
        console.log(e);
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
        var userService = new UserService();
        let queryResp = await userService.getUserDataWithUsername(username);
        console.log(queryResp);
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

router.post('/register', async function(req,res){
    var response, respStatus; 
    try{
        var body = Utils.checkNull(req.body);

        //validate data provided by user
        Utils.checkNull(body.username);
        Utils.checkNull(body.encPass);
        Utils.checkNull(body.name);
        Utils.checkNull(body.address);
        Utils.checkNull(body.dob);
        Utils.checkNull(body.phoneNum);

        //insert user post validation
        var userService = new UserService();
        await userService.createUser(body.username, body.encPass, body.name, body.address, body.dob, body.phoneNum);
        res.json(body.username);
    }catch(e){
       response = "Incorrect paramters";
       logger.error("Data not correct:"+e);
       respStatus = 500;
       res.status(respStatus).send(response);
    }    
});

module.exports = router;