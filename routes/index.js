const express = require('express');
const router = express.Router();
const jwt = require('./auth');

const userRouter = require('./userRout');
const categoryRouter = require('./categoryRout');

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

router.use('/user', userRouter);
router.use('/category', categoryRouter);

module.exports = router;