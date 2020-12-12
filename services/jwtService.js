'use strict()';
const config = require('config');
const jwt = require("jsonwebtoken");
const fs = require('fs');

class JWTService{
    async sign(signObj){
        const jwtExpirySeconds = config.get('Application.envConfig.jwt.tokenExpiry');
        var privateKey = await fs.readFileSync(config.get("Application.envConfig.jwt.privateKey"));
        
        //args for the sign() is the payload, privateKey(incase of RSA256) and expiry
        const token =await jwt.sign(signObj, privateKey, {
            algorithm: "RS256",
            expiresIn: jwtExpirySeconds,
        });

        return token;
    }

    async verify(jwtToken){
        var publicKey = await fs.readFileSync(config.get("Application.envConfig.jwt.privateKey"));

        //args for verify() is the token, public key to validate if the token is not forged
        var decoded=await jwt.verify(jwtToken, publicKey, { algorithms: ['RS256'] });
        return decoded;
    }

}

module.exports = JWTService;