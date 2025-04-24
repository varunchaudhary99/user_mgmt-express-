let User = require('../model/user')
 const bcrypt = require('bcrypt')
 const jwt = require('jsonwebtoken')
 const productDetails = require('../model/product');
 const express = require('express')
 const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const signToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECERT,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
};

let login = async (req, res) => {
  try {
    let { inp_email, inp_password } = req.body;
  
    let user = await User.findOne({email: inp_email.toLowerCase()});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let isValidPWD = await bcrypt.compare(inp_password, user.password);

    if (!isValidPWD) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    let payload = { id: user.id };
    let token = await signToken(payload); // Await the signed token

    res.json({ token });

  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

let productData = async (req, res) => {
  try {
    const products = await productDetails.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};
let transaction = async(req, res) => 
  
 {   
   res.status(200).send("This is transaction page")
}

let wishlist = async(req, res) => 
 {  
  res.status(200).send("This is wishlist page")
  
}



module.exports ={
    login, 
    register,
    productData,
    transaction,
    wishlist
}