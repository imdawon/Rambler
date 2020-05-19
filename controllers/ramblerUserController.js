const db = require('../models/rambler-users');

module.exports = {
    //find all data for user logged in
    findUserList: function(req, res) {
        db
        .findOne({ googleId : req.params.id })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }, 
    updateBucketList: function(req, res) {
        db
        .findOneAndUpdate({ googleId : req.params.id }, 
        {$push: { bucketlist: req.body }})
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err));
    },
    updateLog: function(req, res) {
        db
        .findOneAndUpdate({ googleId : req.params.id }, 
        {$push: { log: req.body }})
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err));
    },
    removeBucketList: function(req, res) {
        db
        .findOneAndUpdate({ googleId : req.params.id }, 
        {$pull: { bucketlist: { id : req.body.id } }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      },
      removeLog: function(req, res) {
        db
        .findOneAndUpdate({ googleId: req.params.id }, 
        {$pull: { log: { id : req.body.id } }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      },
};