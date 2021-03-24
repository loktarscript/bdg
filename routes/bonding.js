var express = require('express');
var router = express.Router();
var response = require('../src/helpers/response');
var bondingController = require('../src/components/bonding/controller');
var authController = require('../src/components/auth/controller');
var {decodeToken} = require('../src/helpers/validations');

router.get('/', function(req, res, next) {
    bondingController.getAll()
    .then((data) => {
        if(data.length > 0){
            response.success(req, res, data, 200);
        }else{
            const message = {
                message: 'No existen usuarios a mostrar',
                data: data
            }
            response.success(req, res, message, 400);
        }
    })
    .catch((err) => {
        response.error(req, res, 'No data', 400, err);
    });
});

router.get('/:id', (req, res) => {
    bondingController.getOne(req)
    .then((data) => {
        if(data.length > 0){
            response.success(req, res, data, 200);
        }else{
            const message = {
                message: 'Usuario no encontrado',
                data: data
            }
            response.success(req, res, message, 400);
        }        
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
})

router.post('/registro', (req, res) => {
    bondingController.insert(req)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
})

router.patch('/:id', (req, res) => {
    bondingController.update(req)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
})

router.delete('/:id', (req, res) => {
    bondingController.delete(req)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
})

router.patch('/pass/change_password', (req, res) =>{
    decodeToken(req, res)
    .then(decoded =>{
        console.log(req.bonding)
        bondingController.changePassword(req.body.passwordOld, req.body.confirmPassword, req.body.newPassword, decoded.data[0])
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch((err) => {
            response.error(req, res, 'No se pudo enviar la información al email', 400, err);
        });
    })
    .catch(err => {console.log(err)
        res.send(err);
    })
});


module.exports = router;