'use strict()';
const express = require('express');
const router  = express.Router();
const UserService = require('../services/userService');

//sample router GET API
router.get('/', async function(req,res){
    res.write("hello");
    res.end();
});



module.exports = router;