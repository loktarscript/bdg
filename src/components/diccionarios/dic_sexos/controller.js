/*/********************************
    Controller: Dic_Sexos 
    Autor: Sebastián Cortés
/*//******************************/
var dbConn = require('../../../db');
var store = require('./store');

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConn.query(store.showAll, (error, dicSexos) => {
            if (error) reject(error);
            // console.log(dicSexos[0]
            resolve(dicSexos[0]);
        })
    })
}

const getOne = (req) => {
    return new Promise((resolve, reject) => {
        dbConn.query(store.showOne, [req.params.id], (error, dicSexos) => {
            if (error) reject(error);
            // console.log(dicSexos[0])
            resolve(dicSexos[0]);
        })
    })
}

const insert = (req) => {
    let bdg = {
        nombre: req.body.nombre,
        activo: req.body.activo
    }
    return new Promise((resolve, reject) => {
        dbConn.query(store.insertData, [bdg.nombre, bdg.activo], (error, dicSexos) => {
            if (error) reject(error);
            resolve({ message: "Registro Agregado!", data: bdg });
        })
    })
}

const update = (req) => {
    let bdg = {
        sid_dic_sexo: req.params.id,
        nombre: req.body.nombre,
        activo: req.body.activo
    }
    console.log(bdg)
    return new Promise((resolve, reject) => {
        dbConn.query(store.showOne, [req.params.id], (error, bonding) => {
            if (error) reject(error);
            if (bonding[0].length > 0) {
                dbConn.query(store.updateData, [bdg.sid_dic_sexo, bdg.nombre, bdg.activo], (error, dicSexos) => {
                    if (error) reject(error);
                    resolve({ message: "Registro Actualizado!", data: bdg });
                })
            } else {
                resolve({ message: "Id no corresponde a ningún registro" })
            }
        })
    })
}

const deleteObj = (req) => {
    let sid_dic_sexo = req.params.id;
    return new Promise((resolve, reject) => {
        dbConn.query(store.showOne, [req.params.id], (error, bonding) => {
            if (error) reject(error);
            if (bonding[0].length > 0) {
                dbConn.query(store.deleteData, [sid_dic_sexo], (error, registro) => {
                    if (error) reject(error);
                    resolve({ message: "Registro Eliminado!" });
                })
            } else {
                resolve({ message: "Id no corresponde a ningún registro" })
            }
        })
    })
}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    insert: insert,
    update: update,
    delete: deleteObj,
}