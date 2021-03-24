const {genSaltSync, hashSync, compare} = require('bcrypt');
const {jwt} = require('../config');
const jsonwebtoken = require('jsonwebtoken');
const response = require('../helpers/response')

const encryptPass = (password) => hashSync(password, genSaltSync(10));

const validateHash = async(password, hash) =>  await compare(password, hash);

const validarDominioEmail = (email) => {
    let tipoEmailFour = email.substring(email.length, email.length - 4);
    let tipoEmailTres = email.substring(email.length, email.length - 3);
    const dominios = ['.com', '.cl', '.ch'];
    let contTres = 0;
    let contCuatro = 0;
    dominios.forEach(dom =>{
        if(dom == tipoEmailFour) contCuatro++;
        if(dom == tipoEmailTres) contTres++;
    })
    if(contCuatro == 0 || contTres == 0) return false;
    return true;
}

const decodeToken = (req, res) =>{
    return new Promise((resolve, reject) =>{
        const token = req.headers['access-token'];
        if(token){
            jsonwebtoken.verify(token, jwt.secret, (error, decoded) =>{
                if(error) response.success(req, res,{message: "Token inválido! Favor comuniquese con el administrador de la plataforma."}, 401);
                console.log(decoded);
                req.bonding = decoded;
                resolve (decoded);
            })
        }else{
           return(response.success(req, res,{message: "No viene el Token!"}, 403));
        }
    })
    
}

module.exports = {
    encryptPass,
    validateHash,
    validarDominioEmail,
    decodeToken
}