var mongoose= require('mongoose');
const meetingSchema = mongoose.Schema({
    organizer:{
        type : String,
        required : true,
        index:true
    },
    dateOfMeeting:{
        type : Date,
        required : true
    },
    startTime:{
        type : String,
        required : true
    },
    endTime:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    attendees:[{
        type : String
    }]
});

meetingSchema.pre('save', function(next){
        next();
});

module.exports = mongoose.model('Meeting', meetingSchema);