const mongoose = require('mongoose')
require('dotenv').config();

let connectDB = async () => {

await mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('connected to DB'))
.catch(() => console.log('failed to connect to DB'))

}



module.exports = connectDB



   