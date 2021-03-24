const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;
const rutasProtegidas = express.Router();
const dbConn = require('../db');
const store = require('../components/bonding/store');

rutasProtegidas.use((req, res, next) =>{
    const token = req.headers['access-token'];
    if(token){
        jwt.verify(token, secret, (error, decoded) =>{
            if(error) res.json({message: "Token inválido! Favor comuniquese con el administrador de la plataforma."});
            req.decoded = decoded;
            deleteRolValidation(req, res, next, decoded);
        })
    }else{
        res.send({message: "Token vacío"});
    }
})

const deleteRolValidation = (req, res, next, decoded) =>{
    console.log(decoded.data[0].sid_bonding)
    dbConn.query(store.showOne, [decoded.data[0].sid_bonding], (error, result) =>{
        if(error) throw error;
        if(result[0].length == 0) console.log({message: "Usuario sin rol!"});
        var checkMethod = false;
        var {roles} = require('../config');
        if (decoded.data[0].nombre == roles.admin.name){
            checkMethod = true;
        }else{
            checkMethod = false;
        }
        if(!checkMethod) {res.status(403).send('No tiene permisos bb')}
        else {next();}
    });
}

module.exports = {
    rutasProtegidas
}
