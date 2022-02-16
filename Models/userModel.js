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
    height: {
        type: String,
        default: null
    },
    weight: {
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
    profileImage: {
        type:String,  //single upload
        default: null
    },
    certification: {
        type: [], //multiple upload
        default: null
    },
    signature: {
        type: String,  //single upload
        default: null
    },
    rating: {
        type: Number, 
        default: null
    },
    about: {
        type: String, 
        default: null
    },
    fitnessCalcultor :{
        type:  [{
            gender:{
                type : String,
                default : null
            },
            age:{
                type : Number,
                default : null
            },
            height:{
                type : Number,
                default : null
            },
            weight:{
                type : Number,
                default : null
            },
            activity:{
                type : String,
                default : null
            },
            neck:{
                type : Number,
                default : null
            },
            waist:{
                type : Number,
                default : null
            },
            hip:{
                type : Number,
                default : null
            },
            goal:{
                type : String,
                default : null
            },
            bmi:{
                type : Number,
                default : null
            },
            bmr:{
                type : Number,
                default : null
            },
            idealBodyWeight:{
                type : Number,
                default : null
            },
            tdee:{
                type : String,
                default : null
            },
            calorieNeeds:{
                type : [ ],
                default : null
            },
            createdDate : {
                type : Date,
                default : Date.now()
            },
            updatedDate : {
                type : Date
               
            }
        }],
        default: []
    }, 
    trainerVideo: {
        type: [{
            vidTitle : {
                type : String,
                default: null
            },
            vidDescription: {
                type : String,
                default : null
           },
           vidPath: {
               type: String,
               default : null
           }
        }],
        default:[]
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
    categoryTrainer: {
        type: Number,
        default: 0  // categoryTrainer 0 is Basic and 1 is stander 2 is premium
    },
    categoryTypeTrainer: {
        type: String,
        require: true
    },
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