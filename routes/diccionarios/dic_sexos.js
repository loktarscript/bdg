var express = require('express');
var router = express.Router();
var dicSexosController = require('../../src/components/diccionarios/dic_sexos/controller');
var middleware = require('../../src/middlewares/customMiddlewares');
var response = require('../../src/helpers/response');

router.get('/', (req, res) => {
    dicSexosController.getAll()
    .then(data =>{ 
        if(data.length > 0){
            response.success(req, res, data, 200);
        }else{
            const message = {
                message: 'No hay géneros a mostrar.',
                data: data
            }
            response.success(req, res, message, 400);
        }
    })
    .catch(err => res.status(err));
})

router.get('/:id', (req, res) => {
    dicSexosController.getOne(req)
    .then(data =>{ 
        if(data.length > 0){
            response.success(req, res, data, 200);
        }else{
            const message = {
                message: 'Género no encontrado',
                data: data
            }
            response.success(req, res, message, 400);
        }
    })
    .catch(err => res.status(err));
})

router.post('/add', (req, res)=>{
    dicSexosController.insert(req)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
})

router.patch('/:id', (req, res) =>{
    dicSexosController.update(req)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
});

router.delete('/:id',  (req, res, next) =>{
    dicSexosController.delete(req)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
})

module.exports = router;