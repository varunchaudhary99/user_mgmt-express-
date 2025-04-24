const  express = require("express")
const dotenv = require("dotenv")
const userRoute = require('./routes/userRoute')
const connectDB = require("./config/database")
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3001
const cors = require('cors');



app.use(express.json())
connectDB()

app.use(cors())
app.use('/api', userRoute)

app.listen(PORT, ()=>{
    console.log(`Running on http://localhost:${PORT}`)
 })