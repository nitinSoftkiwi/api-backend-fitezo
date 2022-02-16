const express = require('express');
var bodyParser = require('body-parser')

const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');  
const app = express();
dotenv.config();

console.log(process.env.DB_CONNECT);
//By Tulsi connect to db
mongoose.connect(process.env.DB_CONNECT)
    .then((connectioninfo) => console.log("connected to db"))
    .catch(err => console.log('Error connecting database:', err))
// old formate for Connection to DB
// mongoose.connect(
//     process.env.DB_CONNECT,
//     {
//         useNewUrlParser : true,
//         useUnifiedTopology : true
//     },
//     () => console.log("connected to db")
// )
    
//import routes
const userRoutes = require('./routes');

//middlewares
app.use(express.json()); //for body parser

//cors 
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Files upload folder
const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


//route middlewares
app.use('/api', userRoutes);


app.get('/',(req , res) => {
    res.send('Hi Fitezo')
})
app.listen(process.env.PORT,() => console.log("server is running on Port ::: "+process.env.PORT));