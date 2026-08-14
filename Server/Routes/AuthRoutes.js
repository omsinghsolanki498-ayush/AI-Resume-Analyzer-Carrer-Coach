const express = require("express");

const{
    RegisterUser,
    LoginUser
 } = require("../Controllers/AuthController");

const router = express.Router();

router.post("/register" , RegisterUser);
router.post("/login" , LoginUser);

module.exports = router;