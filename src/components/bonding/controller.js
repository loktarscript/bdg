/*/********************************
    Controller: Bonding 
    Autor: Sebastián Cortés
/*//******************************/
var dbConn = require('../../db');
var store = require('./store');
var { encryptPass, validateHash, validarDominioEmail } = require('../../helpers/validations');
var { compare } = require('bcrypt');

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConn.query(store.showAll, (error, bondings) => {
            if (error) reject(error);
            resolve(bondings[0]);
        })
    })
}

const getOne = (req) => {
    return new Promise((resolve, reject) => {
        dbConn.query(store.showOne, [req.params.id], (error, bonding) => {
            if (error) reject(error);
            resolve(bonding[0])
        })
    })
}

const insert = (req) => {
    const b_date = new Date(req.body.fch_nacimiento);
    let bdg = {
        username: req.body.username,
        password: encryptPass(req.body.password),
        email: req.body.email,
        fch_nacimiento: b_date,
        profile_image: req.body.profile_image,
        sid_dic_sexo: req.body.sid_dic_sexo,
        sid_rol_bonding: req.body.sid_rol_bonding
    }
    let checkEmail = validateEmail(bdg.email);
    return new Promise((resolve, reject) => {
        if (checkEmail.check) {
            checkEmailBD(bdg.email)
                .then(resp => {
                    if (resp) {
                        checkUser(bdg.username)
                            .then(info => {
                                dbConn.query(store.insertBonding, [bdg.username, bdg.password, bdg.email, bdg.fch_nacimiento, bdg.profile_image, bdg.sid_dic_sexo, bdg.sid_rol_bonding], (error, bonding) => {
                                    if (error) reject(error);
                                    let data = { message: "Registro Agregado!", data: bdg };
                                    resolve(data);
                                })
                            })
                            .catch(err => reject(err));
                    } else {
                        reject('No se pudo agregar')
                    }
                })
                .catch(err => reject(err));
        }
    })
}

const update = (req) => {
    const b_date = new Date(req.body.fch_nacimiento);
    let bdg = {
        sid_bonding: req.params.id,
        username: req.body.username,
        email: req.body.email,
        fch_nacimiento: b_date,
        profile_image: req.body.profile_image,
        sid_dic_sexo: req.body.sid_dic_sexo,
        sid_rol_bonding: req.body.sid_rol_bonding
    }
    return new Promise((resolve, reject) => {
        dbConn.query(store.showOne, [req.params.id], (error, bonding) => {
            if (error) reject(error);
            if (bonding[0].length > 0) {
                dbConn.query(store.updateBonding, [bdg.sid_bonding, bdg.username, bdg.email, bdg.fch_nacimiento, bdg.profile_image, bdg.sid_dic_sexo, bdg.sid_rol_bonding], (error, bonding) => {
                    if (error) reject(error);
                    let data = { message: "Registro Actualizado!", data: bdg };
                    resolve(data);
                })
            } else {
                resolve({ message: "Id no corresponde a ningún registro" })
            }
        })
    })
}

const deleteObj = (req) => {
    let sid_bdg = req.params.id;
    return new Promise((resolve, reject) => {
        dbConn.query(store.showOne, [req.params.id], (error, bonding) => {
            if (error) reject(error);
            if (bonding[0].length > 0) {
                dbConn.query(store.deleteBonding, [sid_bdg], (error, registro) => {
                    if (error) reject(error);
                    let data = { message: "Registro Eliminado!" };
                    resolve(data);
                })
            } else {
                resolve({ message: "Id no corresponde a ningún registro" })
            }
        })

    })
}

const validateEmail = (email) => {
    if (email.length > 0) {
        let contArroba = 0;
        if (validarDominioEmail(email)) {
            return { check: false, message: 'Email Inválido!' }
        } else {
            for (let index = 0; index < email.length; index++) {
                let element = email.charAt([index]);
                if (element == '@') contArroba++;
            }
            if (contArroba >= 2) {
                return { check: false, message: 'Email Inválido!' }
            } else {
                return { check: true, message: 'Email Ok!' }
            }
        }
    } else {
        return { check: false, message: 'Email vacío!' };
    }
};

const checkEmailBD = (email) => {
    return new Promise((resolve, reject) => {
        dbConn.query('select count(*) from bonding where email = ?', [email], (error, contador) => {
            if (error) reject(error);
            let hola = Object.values(JSON.parse(JSON.stringify(contador)));
            let chai = 0;
            hola.forEach((v) => { chai = v });
            let contFinal = 0;
            for (a in chai) { contFinal = chai[a]; }
            if (contFinal == 0) { resolve({ check: true, message: 'Email sin registro previo!' }) } else { reject({ check: false, message: 'Email ya existe!' }) }
        });
    });
}

const checkUser = (username) => {
    return new Promise((resolve, reject) => {
        dbConn.query('select count(*) from bonding where username = ?', [username], (error, respuesta) => {
            if (error) reject(error);
            let objTemp = Object.values(JSON.parse(JSON.stringify(respuesta)));
            let contTemp = 0;
            objTemp.forEach((v) => { contTemp = v });
            let finalContador = 0;
            for (a in contTemp) { finalContador = contTemp[a] }
            if (finalContador == 0) { resolve({ check: true, message: 'Nombre de usuario disponible!' }) } else { reject({ check: false, message: 'Username ya se encuentra en uso!' }) }
        })
    })
}

const changePassword = (password, confirmPassword, newPassword, bonding) => {
    return new Promise(async (resolve, reject) => {
        const validate = await compare(password, bonding.password);
        if (newPassword === confirmPassword) {
            if (!validate) {
                reject('Contraseñas actual incorrecta');
            } else {
                encryptedPass = encryptPass(newPassword)
                dbConn.query(store.actualizarPassword, [bonding.sid_bonding, encryptedPass], (error, respuesta) => {
                    if (error) reject(error);
                    let data = { message: "Contraseña cambiada!" };
                    resolve(data);
                });
            }
        } else {
            reject('Contraseña nueva y campo de confirmacion no coinciden');
        }


    })

}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    insert: insert,
    update: update,
    delete: deleteObj,
    changePassword: changePassword
}