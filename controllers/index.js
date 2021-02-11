'use strict()';
var express = require ('express');
var router = express.Router();
var config = require('config');

const baseUrl = config.get('Application.envConfig.baseUrl');

// //Configuring the expres route for sample controller
// router.use(baseUrl + '/', require('./sampleController'));

//Configuring the express route to the controller for gateway
router.use(baseUrl + '/', require('./userController'));

//Configuring the express route to the controller for status
router.use(baseUrl + '/', require('./statusController'));

module.exports = router;