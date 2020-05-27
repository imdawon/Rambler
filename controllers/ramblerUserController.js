const db = require('../models/rambler-users');

module.exports = {
    //find all data for user logged in
    findUserList: function(req, res) {
        db
        .findOne({ googleId : req.params.id })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    // DO WE NEED THIS?? I DONT THINK SO!
    create: function(req, res) {
        db
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }, 
    // add hike to bucket list
    updateBucketList: function(req, res) {
        db
        .findOneAndUpdate({ googleId : req.params.id }, 
        {$push: { bucketlist: req.body }})
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err));
    },
    // add hike to log
    updateLog: function(req, res) {
        db
        .findOneAndUpdate({ googleId : req.params.id }, 
        {$push: { log: req.body }})
        .then(dbModel => res.json(dbModel))
        .catch(err => console.log(err));
    },
    // remove hike from bucket list
    removeBucketList: function(req, res) {
        db
        .findOneAndUpdate({ googleId : req.params.id }, 
        {$pull: { bucketlist: { id : req.body.id } }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      },
      // remove hike from log
      removeLog: function(req, res) {
        db
        .findOneAndUpdate({ googleId: req.params.id }, 
        {$pull: { log: { id : req.body.id } }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      },
};