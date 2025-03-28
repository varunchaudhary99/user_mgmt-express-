const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const User = require("../model/user")
const {register, login, profile,transaction,wishlist} = require("../controllers/userController");
const verify_token =require("../middleware/verification")


router.post('/register', register)
router.get('/login', login)
router.get('/profile/',verify_token,profile)
router.get('/transaction/',verify_token,transaction)
router.get('/wishlist/',verify_token,wishlist)



module.exports = router;