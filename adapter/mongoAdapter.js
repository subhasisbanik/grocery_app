'use strict()';
const mongoose = require('mongoose');
//import mongoose from "mongoose"
const config = require('config');
let connObj; 
class MongoAdapter{
    async getConnection(){
        console.log("here is nothing:");
        console.log(JSON.stringify(connObj));
        if(null == connObj || undefined == connObj){
            console.log("here");
            connObj = connect();
        }
        return connObj;
    }
    
    connect(){
        return mongoose.createConnection(config.get('Application.envConfig.mongodb.SRV'), { useNewUrlParser: true });
    }
    async find(modelName, objSchema, query){
        const conn = await this.getConnection();
        console.log(conn);
        var model = conn.model(modelName, objSchema);
        let queryResp;
        await model.find(query, function(err, response){
            if(err) console.log(err);
            queryResp = response;
        })
        return queryResp;
    }
    async insert(modelName, objSchema, dataObj){
        const conn = await this.getConnection();
        var model = conn.model(modelName, objSchema);
        await model.create(dataObj, function (err, small) {
            if (err) console.log(err);
            console.log(small);
          });

    }
    async upsert(){

    }
    async delete(){

    }
}
module.exports = new MongoAdapter();



