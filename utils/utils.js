'use strict()';
const config = require('config');
const fs = require('fs');
class Utils {
    static checkNull(value){
        if(!value || ""==value){
            throw new Error("Null/Empty value");
        }
        return value;
    }
}
module.exports = Utils;