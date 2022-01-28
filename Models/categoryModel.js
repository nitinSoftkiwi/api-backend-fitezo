var mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

var categorySchema = new mongoose.Schema({
  
    title: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: Number,
        default: 0 // status 0 is Active and 1 is Inactive
    },
    token : {
        type : String
    },
   
}, { timestamps: true });


var category = new mongoose.model('category', categorySchema);

module.exports = category;