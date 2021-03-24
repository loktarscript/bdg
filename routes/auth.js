var express = require('express');
var router = express.Router();
var response = require('../src/helpers/response');
var bondingController = require('../src/components/bonding/controller');
var authController = require('../src/components/auth/controller');
var {decodeToken} = require('../src/helpers/validations');

//LOGIN
router.post('/login', (req, res) =>{
    let username = req.body.username;
    let pass = req.body.password;
    authController.login(username, pass)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.success(req, res, 'Contraseña Incorrecta', 400);
    })
});

router.post('/forgot', (req, res) =>{
    authController.forgotPassword(req, res, req.body.email)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
});

module.exports = router;