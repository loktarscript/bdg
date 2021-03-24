var dbConn = require('../../db');

let loginProcedure = 'call LOGIN_SELECT_BONDING(?)'
let findBondingByEmail = 'call FIND_BONDING_BY_EMAIL(?)'
let updatePasswordBonding = 'call UPDATE_PASSWORD_BONDING(?,?)';
var { encryptPass, validateHash, validarDominioEmail } = require('../../helpers/validations');

const checkUser = (username)=>{
    return new Promise((resolve, reject) => {
        dbConn.query(loginProcedure, [username], (error, bonding)=>{
            if (error) reject(error);
            resolve(bonding);
        });
    });
}

const findByEmail = (email)=>{
    return new Promise((resolve, reject)=>{
        dbConn.query(findBondingByEmail, [email], (error, bonding)=>{
            if (error) reject(error);
            resolve(bonding);
        })
    });
}

const updatePassBDG = (email, password) =>{
    let hashedPass = encryptPass(password);
    return new Promise((resolve, reject)=>{
        dbConn.query(updatePasswordBonding, [email, hashedPass], (error, data) =>{
            if (error) reject({check: false, message: error});
            resolve({check: true, message:'Contraseña cambiada!, se envió un email a la dirección de correo con la nueva contraseña'});
        });
    });
}




module.exports = {
    checkUser,
    findByEmail,
    updatePassBDG
}