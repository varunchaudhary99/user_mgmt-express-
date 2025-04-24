const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const User = require("../model/user")
const product = require('../model/product');
const {register, login, productData,transaction,wishlist} = require("../controllers/userController");
const verify_token =require("../middleware/verification")


router.post('/register', register)
router.post('/login', login)
router.get('/products', productData);
router.get('/transaction/',verify_token,transaction)
router.get('/wishlist/',verify_token,wishlist)
router.get('/')


module.exports = router;