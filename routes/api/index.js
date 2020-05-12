const router = require("express").Router();
const ramblerUserRoutes = require("./rambleruser");

// user routes
router.use("/user", ramblerUserRoutes);

module.exports = router;
