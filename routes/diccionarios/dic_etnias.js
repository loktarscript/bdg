var express = require('express');
var router = express.Router();
var dicEtniasController = require('../../src/components/diccionarios/dic_etnias/controller');
var response = require('../../src/helpers/response');

router.get('/', (req, res) => {
    dicEtniasController.getAll()
    .then(data =>{ 
        if(data.length > 0){
            response.success(req, res, data, 200);
        }else{
            const message = {
                message: 'No hay etnias a mostrar.',
                data: data
            }
            response.success(req, res, message, 400);
        }
    })
    .catch(err => res.status(err));
})

router.get('/:id', (req, res) => {
    dicEtniasController.getOne(req)
    .then(data =>{ 
        if(data.length > 0){
            response.success(req, res, data, 200);
        }else{
            const message = {
                message: 'Etnia no encontrada',
                data: data
            }
            response.success(req, res, message, 400);
        }
    })
    .catch(err => res.status(err));
})

router.post('/add', (req, res)=>{
    dicEtniasController.insert(req)
    .then(data =>{ res.json(data)})
    .catch(err => res.status(err));
})

router.patch('/:id', (req, res) =>{
    dicEtniasController.update(req)
    .then(data =>{ res.json(data)})
    .catch(err => res.status(err));
});

router.delete('/:id', (req, res) =>{
    dicEtniasController.delete(req)
    .then(data =>{ res.json(data)})
    .catch(err => res.status(err));
})

module.exports = router;