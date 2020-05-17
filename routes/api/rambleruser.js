const router = require('express').Router();
const ramblerUserController = require('../../controllers/ramblerUserController');

router
    .route("/")
    .post(ramblerUserController.create)
//get user saved hikes
router
    .route("/:id")
    .get(ramblerUserController.findUserList)
//add to log
router
    .route("/log/:id")
    .put(ramblerUserController.updateLog)
//remove from log
router
    .route("/log/remove/:id")
    .put(ramblerUserController.removeLog)

//add to bucketlist
router
    .route("/bucketlist/:id")
    .put(ramblerUserController.updateBucketList)
//remove from bucketlist
router 
    .route("/bucketlist/remove/:id")
    .put(ramblerUserController.removeBucketList)


module.exports = router;
