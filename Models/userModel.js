var mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

var schema = new mongoose.Schema({
  
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    phone:  {
        type: String,
        default: null
    },
    password: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        default: null
    },
    city:{
        type: String,
        default: null
    },
    zipCode:{
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    experience: {
        type: String,
        default: null
    },
    specialization: {
        type: String,
        default: null
    },
    certification: {
        type: String, //multiple upload
        default: null
    },
    photo: {
        type:String,  //single upload
        default: null
    },
    signature: {
        type: String,  //single upload
        default: null
    },

    trainer: [{

        specialization: {
            type: String,
            require: true
        },
        certification: {
            type: String,
            require: true
        },
        photo: {
            type:String,
            require: true
        },
        signature: {
            type: String,
            require: true
        },
        uploadVideo: {
            type: String,
            require: true
        },
        uploadAudio: {
            type: String,
            require: true
        },
        classesName: {
            type: String,
            require: true
        },
        validityVideoDate: {
            type: Date,
            require: true
        },
        categoryVideoName: {
            type: String,
            require: true
        },
        status: {
            type: Number,
            default: 0 // status 0 is Active and 1 is Delete 2 is Deactive
        },  
    }],
    
    userType: {
        type: String,
        default: 'user'
    },
    status: {
        type: Number,
        default: 0 // status 0 is Active and 1 is Inactive
    },
    token: { type: String },
   
}, { timestamps: true });


var session = new mongoose.Schema({
    userId: {
        type: String, // this line to chnage after some time
        default: null,
        ref: 'user'
    },
    authToken: {
        type: String
    }
}, { timestamps: true });

var user = new mongoose.model('User', schema);
mongoose.model('session', session);


module.exports = user;