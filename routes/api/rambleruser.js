const router = require('express').Router();
const ramblerUserController = require('../../controllers/ramblerUserController');

router.route("/")
    .post(ramblerUserController.create);

router
.route("/bucketlist/:id")
    .get(ramblerUserController.findAllBucketList)


module.exports = router;
