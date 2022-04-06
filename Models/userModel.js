var mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

var schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      require: true,
    },
    dob: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
    weight: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    zipCode: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    experience: {
      type: String,
      default: null,
    },
    specialization: {
      type: String,
      default: null,
    },
    profileImage: {
      type: String, //single upload
      default: null,
    },
    certification: {
      type: [], //multiple upload
      default: null,
    },
    signature: {
      type: String, //single upload
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    language: {
      type: String,
      default: null,
    },
    quickBloxData: {
      type: [],
      default: null,
    },
    vacationTrainer: {
      type: [
        {
          startDate: {
            type: String,
            require: true,
          },
          endDate: {
            type: String,
            require: true,
          },
          reasons: {
            type: String,
            require: true,
          },
          status: {
            type: Number,
            default: 0, //0 means show notification , 1 means hide notification
          },
        },
      ],
      default: [],
    },
    rating: {
      type: Number,
      default: null,
    },
    about: {
      type: String,
      default: null,
    },
    trainerAvailabilities: {
      type: [
        {
          day: {
            type: String,
            default: null,
          },
          date: {
            type: String,
            default: null,
          },
          slots: {
            type: [],
            default: null,
          },
          status: {
            type: Number, // 0- Active, 1- Inactive
            default: null,
          },
        },
      ],
      default: [],
    },
    fitnessCalcultor: {
      type: [
        {
          gender: {
            type: String,
            default: null,
          },
          age: {
            type: Number,
            default: null,
          },
          height: {
            type: Number,
            default: null,
          },
          weight: {
            type: Number,
            default: null,
          },
          activity: {
            type: String,
            default: null,
          },
          neck: {
            type: Number,
            default: null,
          },
          waist: {
            type: Number,
            default: null,
          },
          hip: {
            type: Number,
            default: null,
          },
          goal: {
            type: String,
            default: null,
          },
          bmi: {
            type: Number,
            default: null,
          },
          bmr: {
            type: Number,
            default: null,
          },
          idealBodyWeight: {
            type: Number,
            default: null,
          },
          tdee: {
            type: String,
            default: null,
          },
          calorieNeeds: {
            type: [],
            default: null,
          },
          createdDate: {
            type: Date,
            default: Date.now(),
          },
          updatedDate: {
            type: Date,
          },
        },
      ],
      default: [],
    },
    trainerVideo: {
      type: [
        {
          vidTitle: {
            type: String,
            default: null,
          },
          vidDescription: {
            type: String,
            default: null,
          },
          vidPath: {
            type: String,
            default: null,
          },
        },
        { timestamps: true },
      ],
      default: [],
    },
    bookingSlot: {
      type: [
        {
          package: {
            type: String,
            require: true,
          },
          slotId: {
            type: String,
            require: true,
          },
          userId: {
            type: String,
            require: true,
          },
          packageSession: {
            type: String,
            require: true,
          },
          fromTime: {
            type: String,
            require: true,
          },
          toTime: {
            type: String,
            require: true,
          },
          customerId: {
            type: String,
            require: true,
          },
          payment: {
            type: String,
            default: null,
          },
          bookingStatus: {
            type: Number,
            default: 0, // 0- Pending, 1- Booked, 2- Cancelled
          },
          createdAt: {
            type: Date,
            default: Date.now(),
          },
          status: {
            type: Number, // 2- Disable
            default: null,
          },
        },
      ],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
    },
    categoryTrainer: {
      type: Number,
      default: 0, // categoryTrainer 0 is stander and 1 is premium
    },
    categoryTypeTrainer: {
      type: String,
      require: true,
    },
    userType: {
      type: String,
      default: "user",
    },
    workoutStatistic: {
      type: [
        {
          running: {
            type: String,
            default: null
          },
          cycling:{
            type: String,
            default: null
          },
          yoga: {
            type: String,
            default: null
          },
           createdAt: {
            type: Date,
            default: Date.now(),
          },
          updatedAt: {
            type: Date,
          },
          workoutDay: {
            type: String
          }
        }
      ]
    },
    workoutDitePlanPerUser: {
      type: [
        {
          trainerId: {
            type: String,
            required: true,
          },
          userId: {
            type: String,
            required: true,
          },
          dietHeading: {
            type: String,
            required: true,
          },
          dietDescription: {
            type: String,
            required: true,
          },
          dietTime: {
            type: String,
            required: true,
          },
          dietType: {
            type: String, // monthly, weekly
            required: true,
          },
          status: {
            type: Number,
            default: 0, // status 0 is Active and 1 is Inactive
          }, 
          createdAt: {
            type: Date,
            default: Date.now(),
          },
          updateAt: {
            type: Date,
          },
          dietImage: {
            type: String, //single upload
            default: null,
          },
          dietMealPlan: {
            type: String,   //breakfast,Dinner,Lunch, snake
            default: "weekly",
          },
        }
      ]
    },
    status: {
      type: Number,
      default: 0, // status 0 is Active and 1 is Inactive
    },
    token: { type: String },
  },
  { timestamps: true }
);

var session = new mongoose.Schema(
  {
    userId: {
      type: String, // this line to chnage after some time
      default: null,
      ref: "user",
    },
    authToken: {
      type: String,
    },
  },
  { timestamps: true }
);

var user = new mongoose.model("User", schema);
mongoose.model("session", session);

module.exports = user;
