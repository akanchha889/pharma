var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('doctors');

var service = {};


service.getAll = getAll;
//service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;


  
function getAll() {
    var deferred = Q.defer();

    db.doctors.find().toArray(function (err, doctors) {
        if (err) deferred.reject(err.name + ': ' + err.message);
          // return users (without hashed passwords)
        doctors = _.map(doctors, function (doctor) {
            return _.omit(doctor, 'hash');
        });

        deferred.resolve(doctors);
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




function create(doctorParam) {
    var deferred = Q.defer();

    // validation

    db.doctors.findOne(
        { doctorID : doctorParam.doctorID },
        function (err, doctor) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (doctor) {
                // username already exists
                deferred.reject('DoctorID "' + doctorParam.doctorID + '" is already taken');
            } else {
                createDoctor();
            }
        });

   function createDoctor() {
          var doctor = _.omit(doctorParam, 'password');

        // add hashed password to user object
        doctor.hash = bcrypt.hashSync(doctorParam.password, 10);
        db.doctors.insert(
            doctor,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}


function update(_id, doctorParam) {
    var deferred = Q.defer();

    // validation
    db.doctors.findById(_id, function (err, doctor) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (doctor.doctorID !== doctorParam.doctorID) {
            // customerName has changed so check if the new customerName is already taken
            db.doctors.findOne(
                { doctorID: doctorParam.doctorID },
                function (err, doctor) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (doctor) {
                        // customer name already exists
                        deferred.reject('doctorID "' + req.body.doctorID + '" is already taken')
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
            doctorFirstName: doctorParam.doctorFirstName,
            doctorLastName: doctorParam.doctorLastName,
            doctorID: doctorParam.doctorID,
        };
        if (doctorParam.password) {
            set.hash = bcrypt.hashSync(doctorParam.password, 10);
        }
        db.doctors.update(
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

    db.doctors.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ':  ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}




