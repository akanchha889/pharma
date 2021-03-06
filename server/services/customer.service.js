var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('customers');

var service = {};


service.getAll = getAll;
//service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;


  
function getAll() {
    var deferred = Q.defer();

    db.customers.find().toArray(function (err, customers) {
        if (err) deferred.reject(err.name + ': ' + err.message);
          // return users (without hashed passwords)
        customers = _.map(customers, function (customer) {
            return _.omit(customer, 'hash');
        });

        deferred.resolve(customers);
    });

    return deferred.promise;
}


function create(customerParam) {
    var deferred = Q.defer();

    // validation

    db.customers.findOne(
        { customerName : customerParam.customerName },
        function (err, customer) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (customer) {
                // username already exists
                deferred.reject('customerName "' + customerParam.customerName + '" is already taken');
            } else {
                createUser();
            }
        });

   function createUser() {
          var customer = _.omit(customerParam, 'password');

        // add hashed password to user object
        customer.hash = bcrypt.hashSync(customerParam.password, 10);
        db.customers.insert(
            customer,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}


function update(_id, customerParam) {
    var deferred = Q.defer();

    // validation
    db.customers.findById(_id, function (err, customer) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (customer.customerName !== customerParam.customerName) {
            // customerName has changed so check if the new customerName is already taken
            db.customers.findOne(
                { customerName: customerParam.customerName },
                function (err, customer) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (customer) {
                        // customer name already exists
                        deferred.reject('Customername "' + req.body.customerName + '" is already taken')
                    } else {
                        updateCustomer();
                    }
                });
        } else {
            updateCustomer();
        }
    });

    function updateCustomer() {
        // fields to update
        var set = {
            custFirstName: customerParam.custFirstName,
            custLastName: customerParam.custLastName,
            customerName: customerParam.customerName,
        };




         if (customerParam.password) {
            set.hash = bcrypt.hashSync(customerParam.password, 10);
        }
        db.customers.update(
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

    db.customers.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ':  ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}




