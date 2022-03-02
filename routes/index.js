const express = require('express');
const router = express.Router();
const jwt = require('./auth');
const nodemailer = require('nodemailer')
const userRouter = require('./userRout');
const categoryRouter = require('./categoryRout');
const dotenv = require('dotenv');
dotenv.config();

router.use(jwt);


router.use((err , req , res , next)=>{
    if (err.name === 'UnauthorizedError') {
        res.status(err.status).send({
            message : err.message
        });
        return ;
    }
    next();
});
//mail
const contactEmail = {
    //this is the authentication for sending email.
host: 'smtp.gmail.com',
// port: 465,
port: 587,
secure: true, // use TLS
//create a .env file and define the process.env variables 
   // with the credentials you want to use for your email server.
auth: {
    Username: "'" +process.env.SMTP_TO_EMAIL+ "'",
    Password: "'" +process.env.SMTP_TO_PASSWORD+ "'",
},
}

const transporter = nodemailer.createTransport(contactEmail)
    transporter.verify((error, success) => {
if (error) {
    //if error happened code ends here
    console.error('niyniyninynyniyn',error)
} else {
    //this means success
    console.log('Ready to send mail!', success)
}
})
router.use('/user', userRouter);
router.use('/category', categoryRouter);

module.exports = router;