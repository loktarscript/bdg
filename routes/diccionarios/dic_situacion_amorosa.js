var express = require('express');
var router = express.Router();
var dicSitAmorosaController = require('../../src/components/diccionarios/dic_sit_amorosa/controller');;
var response = require('../../src/helpers/response');

router.get('/', (req, res) => {
    dicSitAmorosaController.getAll()
    .then(data =>{ 
        if(data.length > 0){
            response.success(req, res, data, 200);
        }else{
            const message = {
                message: 'No hay sit_amorosas a mostrar.',
                data: data
            }
            response.success(req, res, message, 400);
        }
    })
    .catch(err => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
})

router.get('/:id', (req, res) => {
    dicSitAmorosaController.getOne(req)
    .then(data =>{ 
        if(data.length > 0){
            response.success(req, res, data, 200);
        }else{
            const message = {
                message: 'Sit_amorosa no encontrada',
                data: data
            }
            response.success(req, res, message, 400);
        }
    })
    .catch(err => response.error(req, res, 'Info Inválida', 400, err));
})

router.post('/add', (req, res)=>{
    dicSitAmorosaController.insert(req)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
})

router.patch('/:id', (req, res) =>{
    dicSitAmorosaController.update(req)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
});

router.delete('/:id', (req, res) =>{
    dicSitAmorosaController.delete(req)
    .then((data) => {
        response.success(req, res, data, 200);
    })
    .catch((err) => {
        response.error(req, res, 'Info Inválida', 400, err);
    });
})

module.exports = router;
