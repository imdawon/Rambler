const db = require('../models/rambler-users');

module.exports = {
    //find all data for user logged in
    findById: function(req, res) {
        db
        .findById(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }, 
    update: function(req, res) {
        db
        .findOneAndUpdate(req.params.id, 
        {$push: {bucketlist: req.body}})
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err));
    }
};