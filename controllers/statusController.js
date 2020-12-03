'use strict()';
const express = require('express');
const router  = express.Router();

router.get('/status', async function(req,res){
    res.write("status up");
    res.end();
});



module.exports = router;