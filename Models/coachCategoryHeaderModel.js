var mongoose = require('mongoose');


var coachCategoryHeaderpageSchema = new mongoose.Schema({
    getCoachHeaderCategory:{
        type: String,
        require: true
    },
    headingTrainer: {
        type: String,
        require: true //only use admin chanage header heading in get a coach in user dashboard

    },
    paragraphTypeTrainer: {
        type: String,
        require: true
        //only use admin chanage header paragraph in get a coach in user dashboard
    },
    imageTypeTrainer: {
        type: String,
        require: true
         //only use admin chanage header imageType in get a coach in user dashboard
    },
}, { timestamps: true })

var coachCategoryHeaderpage = new mongoose.model('coachCategoryHeaderpage', coachCategoryHeaderpageSchema);

module.exports = coachCategoryHeaderpage;