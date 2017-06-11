var config = require('config.json');
var express = require('express');
var router = express.Router();
var customerService = require('services/customer.service');


// routes
//router.post('/register', register);
router.get('/', getAll);
//router.get('/current', getCurrent);
//router.put('/:_id', update);
//router.delete('/:_id', _delete);

module.exports = router;

/*function register(req, res){
     alert('customer controller register method' );
    customerService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}*/


function getAll(req,res){
    customerService.getAll()
        .then(function(customers){
            res.send(customers);
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
}




function update(req,res){
    customerService.update(req.params._id,req.body)
        .then(function(){
            res.sendStatus(200);

        })
            .catch(function(err){
                req.sendStatus(400);
            });
}

function _delete(req,res){
    customerService.delete(req.params._id)
        .then(function(){
            sendStatus(200);
        })
        .catch(function(err){
            sendStatus(400);
        });
}*/


