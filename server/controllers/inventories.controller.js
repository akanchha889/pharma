var config = require('config.json');
var express = require('express');
var router = express.Router();
var inventoryService = require('services/inventory.service');


// routes
router.post('/register', register);
router.get('/', getAll);
//router.get('/current', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

function register(req, res){
    inventoryService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

   
function getAll(req,res){
    inventoryService.getAll()
        .then(function(inventories){
            res.send(inventories);
        })
        .catch(function(err){
            res.sendStatus(400).send(err);
        });

}

/*
function getCurrent(req, res) {
    customerService.getById(req.customer.sub)
        .then(function (customer) {
            if (customer) {
                res.send(customer);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}*/




function update(req,res){
    inventoryService.update(req.params._id,req.body)
        .then(function(){
            res.sendStatus(200);

        })
            .catch(function(err){
                req.sendStatus(400);
            });
}

function _delete(req,res){
    inventoryService.delete(req.params._id)
        .then(function(){
            sendStatus(200);
        })
        .catch(function(err){
            sendStatus(400);
        });
}


