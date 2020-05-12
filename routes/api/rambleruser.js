const router = require('express').Router();
const ramblerUserController = require('../../controllers/ramblerUserController');

router
    .route("/")
    .post(ramblerUserController.create)

router
    .route("/:id")
    .get(ramblerUserController.findById)

router
    .route("/log/:id")
    .put(ramblerUserController.updateLog)

router
    .route("/bucketlist/:id")
    .put(ramblerUserController.updateBucketList)


module.exports = router;
