'use strict()';
const express = require('express');
const router  = express.Router();
const UserService = require('../service/userService');
router.get('', async function(req,res){
    res.write("hello");
    res.end();
});

module.exports = router;