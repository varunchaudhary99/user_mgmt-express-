const mongoose = require('mongoose')
require('dotenv').config();
const Product = require("../model/product")
const ProductJson = require("../config/product")

let connectDB = async () => {
try {
    await mongoose.connect(process.env.MONGO_URL)
    await Product.create(ProductJson)
    console.log("success")
} catch (error){
    console.log(error);
}

}

module.exports = connectDB