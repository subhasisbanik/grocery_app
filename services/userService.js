'use strict()';
const config = require('config');
const User = require('../dto/user');
const logger = require('../adapter/loggingAdapter');
const mongoAdapter = require('../adapter/mongoAdapter');

class UserService{

    async getUserDataWithUsername(username){
        let userSchema = new User(username).getUserSchema();
        var query = {"username":username};
        try{
            console.log(userSchema);
            return await mongoAdapter.find('User',userSchema, query);
        }catch(e){
            logger.error(e);
            logger.error("Unable to find user");
        }        
    }

    async checkUserWithUsername(username){
        let userSchema = new User(username).getUserSchema();
        var query = {"username":username};
        try{
            let queryResp = await mongoAdapter.find('User',userSchema, query);
            //check for queryResp array non zero element, check for username exists and return true/false
        }catch(e){
            logger.error(e);
            logger.error("Unable to find user");
        }        
    }

    async createUser(username, encPass, name, address, dob, phoneNum){
        var timestamp = Date.parse(dob);
        var dateObject = new Date(timestamp);
        try{    
            let userObj = new User(username, name, encPass, address, dateObject, phoneNum);    
            let userSchema = userObj.getUserSchema();
            await mongoAdapter.insert('User', userSchema, userObj.toJSON());
        }catch(e){
            logger.error(e);
            logger.error("Unable to insert user");
        }
        
    }

}

module.exports = UserService;