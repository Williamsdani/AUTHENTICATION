const express = require("express");
const { newUser, singUp } = require("../Controllers/userController");
const router = express.Router();

router.post("/signup", newUser)







module.exports = router;