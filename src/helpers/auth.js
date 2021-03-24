const jwt = require('jsonwebtoken');
const config = require('../config')
const secret = config.jwt.secret;
const error = require('../helpers/error');

const sign = (data) =>{
    return jwt.sign({data}, secret);
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
        if(decoded.id !== owner){
            throw error('No puedes hacer esto!', 401);
        }
    }
}

const getToken = (auth) =>{
    if(!auth){
        throw new Error('No viene Token');
    }
    if (auth.indexOf('Bearer ') == -1){
        throw new Error('Formato inválido');
    }

    let token = auth.replace('Bearer ', '');
    return token;
}

const verify = (token) =>{
    return jwt.verify(token, secret);
}

const decodeHeader = (req) =>{
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization); 
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}

module.exports = {
    sign,
    check,
    decodeHeader
};