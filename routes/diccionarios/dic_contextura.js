var express = require('express');
var router = express.Router();
var dicContexturaController = require('../../src/components/diccionarios/dic_contextura/controller');
var response = require('../../src/helpers/response');

router.get('/', (req, res) => {
    dicContexturaController.getAll()
    .then(data =>{ 
        if(data.length > 0){
            response.success(req, res, data, 200);
        }else{
            const message = {
                message: 'No hay contexturas a mostrar.',
                data: data
            }
            response.success(req, res, message, 400);
        }
    })
    .catch(err =>  response.error(req, res, 'Info Inválida', 400, err));
})

router.get('/:id', (req, res) => {
    dicContexturaController.getOne(req)
    .then(data =>{ 
        if(data.length > 0){
            response.success(req, res, data, 200);
        }else{
            const message = {
                message: 'Contextura no encontrada',
                data: data
            }
            response.success(req, res, message, 400);
        }
    })
    .catch(err => res.status(err));
})

router.post('/add', (req, res)=>{
    dicContexturaController.insert(req)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
})

router.patch('/:id', (req, res) =>{
    dicContexturaController.update(req)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
});

router.delete('/:id', (req, res) =>{
    dicContexturaController.delete(req)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
})

module.exports = router;
