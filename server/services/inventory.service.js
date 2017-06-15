var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('inventories');

var service = {};


service.getAll = getAll;
//service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;


  
function getAll() {
    var deferred = Q.defer();

    db.inventories.find().toArray(function (err, inventories) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        inventories = _.map(inventories, function (inventory) {
            return inventory;
        });

        deferred.resolve(inventories);
    });

    return deferred.promise;
}



/*function getById(_id) {
    var deferred = Q.defer();

    db.customer.findById(_id, function (err, customer) {
        if (err) deferred.reject(err.name + ': ' + err.message);
           if (customer) {
            // return user (without hashed password)
             deferred.resolve(_.omit(customer, 'hash'));
           } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}*/




function create(inventoryParam) {
    var deferred = Q.defer();

    // validation

    db.inventories.findOne(
        { inventory_ID : inventoryParam.inventory_ID },
        function (err, inventory) {
            if (err) deferred.reject(err.inventory_ID + ': ' + err.message);

            if (inventory) {
                // username already exists
                deferred.reject('inventory_ID "' + inventoryParam.inventory_ID + '" is already taken');
            } else {
                createInventory();
            }
        });

   function createInventory() { 
          db.inventories.insert(
            inventoryParam,
            function (err, inventoryParam) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}


function update(_id, inventoryParam) {
    var deferred = Q.defer();

    // validation
    db.inventories.findById(_id, function (err, inventory
    ) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (inventory.inventory_ID !== inventoryParam.inventory_ID) {
           
            db.inventories.findOne(
                { inventory_ID: inventoryParam.inventory_ID },
                function (err, inventory) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (inventory) {
                        // inventory_ID name already exists
                        deferred.reject('inventory_ID "' + req.body.inventory_ID + '" is already taken')
                    } else {
                        updateInventory();
                    }
                });
        } else {
            updateInventory();
        }
    });

    function updateInventory() {
        // fields to update
        var set = {
            quantity :inventoryParam.quantity,
            name: inventoryParam.name,
            price: inventoryParam.price,
            inventory_ID: inventoryParam.inventory_ID,
        };
        db.inventories.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.inventories.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ':  ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}




