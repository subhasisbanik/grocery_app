'use strict()';
const schema = require('mongoose').Schema;
const { add } = require('winston');
const Utils = require('../utils/utils');
class User{
    constructor(_username, _name, _encPass="", _address="", _dob="", _phoneNum=""){
        this._username = _username;
        this._name = _name;
        this._encPass = _encPass;
        this._address = _address;
        this._dob = _dob;
        this._phoneNum = _phoneNum;
    }

   getUserSchema(){
        let userSchema = schema({
            username:  String, 
            encPass: String,
            name: String,
            address: String,
            dob: { type: Date, default: Date.now },
            phoneNum : Number
          });
        //   userSchema.virtual('_username').set(function(){
        //       return this.username;
        //   });
        //userSchema.set('toJSON', { getters: true });
          return userSchema;
    }

    get username(){
        return this._username;
    }
    set username(userName){
        this._username = userName;
    }
    get name(){
        return this._name;
    }
    set name(name){
        this._name = name;
    }
    get address(){
        return this._address;
    }
    set address(address){
        this._address = address;
    }
    get dob(){
        return this._dob;
    }
    set dob(dob){
        this._dob = dob;
    }
    get phoneNum(){
        return this._phoneNum;
    }
    set phoneNum(phoneNum){
        this._phoneNum = phoneNum;
    }    
    toJSON(){
        return{
            username: this._username,
            name : this._name,
            encPass : this._encPass,
            address: this._address,
            dob: this._dob,
            phoneNum : this._phoneNum
        }
    }
    // toObject(){
    //     return{
    //         username: this._username
    //     }
    // }
}
module.exports = User;