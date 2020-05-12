const router = require('express').Router();
const ramblerUserController = require('../../controllers/ramblerUserController');

router
    .route("/")
    .post(ramblerUserController.create)

router
    .route("/:id")
    .get(ramblerUserController.findById)
    .put(ramblerUserController.update)

module.exports = router;
