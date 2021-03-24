var express = require('express');
var router = express.Router();
var response = require('../src/helpers/response');
var rolBdgController = require('../src/components/rol_bonding/controller');

router.get('/', function(req, res, next) {
    rolBdgController.getAll()
    .then(data => {
        if(data.length > 0){
            response.success(req, res, data, 200);
        }else{
            const message = {
                message: 'No existen registros a mostrar',
                data: data
            }
            response.success(req, res, message, 400);
        }
    })
    .catch(err => {
        response.error(req, res, err, 400);
    });
});

router.get('/:id', (req, res) => {
    rolBdgController.getOne(req)
    .then(data => {
        if(data.length > 0){
            response.success(req, res, data, 200);
        }else{
            const message = {
                message: 'No existen registros a mostrar',
                data: data
            }
            response.success(req, res, message, 400);
        }
    })
    .catch(err => {
        response.error(req, res, err, 400);
    });
});

router.post('/add', (req, res) => {
    rolBdgController.insert(req)
    .then(data => {
        response.success(req,res, data, 201);
    })
    .catch(err => {
        response.error(req, res, err, 400);
    });
})

router.patch('/:id', (req, res) => {
    rolBdgController.update(req)
    .then(data => res.json(data))
    .catch(err => {console.log(err)});
})

router.delete('/:id', (req, res) => {
    rolBdgController.delete(req)
    .then(data => res.json(data))
    .catch(err => {console.log(err)});
})

module.exports = router;