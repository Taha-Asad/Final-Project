const express = require('express') ;
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
dotenv.config()
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
    origin: "http://localhost:3000",
    method:['GET' , 'POST' , 'PUT' , 'Delete'] ,
}))


const port = process.env.PORT 
const foodRoute = require('./routes/foodRoute.js')
const categoryRoute = require('./routes/categoryRoute.js')
const tableBookingRoute = require('./routes/tableBookingRoute.js')
const UserRoute = require("./routes/userRoute.js")
app.use('/api/v1/food' , foodRoute );
app.use('/api/v1/category' , categoryRoute)
app.use('/api/v1/reservation' , tableBookingRoute)
app.use('/api/v1/user' , UserRoute )

//global error handling

app.use((error , req , res , next )=>{
    error.statusCode = error.statusCode || 500 ,
    error.status = error.status || 'error' ,


    res.status(error.statusCode).json({
        status: error.status ,
        message : error.message
    })
})


app.listen(port , ()=>{
    console.log(`The server is running succesfully on port ${port} `)
    connectDB()
})
app.get('/' ,(req , res )=>{
    res.send("The server has started successfully")
})