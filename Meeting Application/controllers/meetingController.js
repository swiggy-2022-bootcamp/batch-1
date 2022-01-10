const User=require('../models/user');
const Meeting = require('../models/meeting');
const { use } = require('../routes/userRoute');
const { json } = require('body-parser');

const createMeeting = (req, res)=>{
    let token=req.cookies.auth;
    const {dateOfMeeting, startTime, endTime, description, attendees} = req.body;
    User.findByToken(token, (err,user)=>{
         if(err) return res(err);
         if(user) return res.status(201).send(createMeetingbyUser(dateOfMeeting,startTime, endTime, description, attendees, user));
         else return res.status(400).send("Login First");
    });
}

const getmeetings = (req, res)=>{
    let token=req.cookies.auth;
    User.findByToken(token, (err,user)=>{
        if(err) return res(err);
        if(user) return getAllMeettingsforUser(req,res,user);
        else return res.status(400).send("Login First");
   });
}

const getMeetingdetails = async (req, res)=>{
    let token=req.cookies.auth;
    console.log(token)
    const meeting_id = req.query.meeting_id;
    let user  = await User.findOne({token:token});
    let meetingInfo = {}
    console.log(user);
    let isMeetingExistsForUser = user.meetings.includes(meeting_id);
    if(isMeetingExistsForUser)
        meetingInfo = await Meeting.findById(meeting_id);
    else 
       return res.status(200).send("No Meetings found by Given Id for the User");
    
       return res.status(200).send(meetingInfo);
}


const dropUserfromMeeting = (req, res)=>{
    let token=req.cookies.auth;
    Meeting.findByIdAndDelete(req.query.meeting_id, (err,docs)=>{
        if(err) return res(err);
        if(docs) return res.status(200).json(docs);
        else return res.status(400).send("No meetings");
    });
}


function createMeetingbyUser(dateOfMeeting,startTime, endTime, description, attendees, user){
    const newMeeting =  new Meeting(); 
    newMeeting.startTime = startTime;
    newMeeting.endTime = endTime;
    newMeeting.description = description;
    newMeeting.dateOfMeeting = new Date(dateOfMeeting);
    newMeeting.organizer = user.email;
    
    if(attendees.length > 0)
        addAttendeestoMeeting(attendees,newMeeting);
    
    newMeeting.attendees.push(user.email);
    
    //console.log(newMeeting);
    newMeeting.save((err, doc)=>{
        if(err) return err.message;
        updateAllAttendeesWithMeetingId(doc.attendees, doc._id);
    })

    return "true";
}

function updateAllAttendeesWithMeetingId(attendees, meeting_id){
    for(let attendee of attendees){
        User.findOne({email:attendee}, (err, user)=>{
            if(user) {
                user.meetings.push(meeting_id);
                user.save();
            }
        })
    }
}

function addAttendeestoMeeting(attendees, newMeeting){
    for(let attendeeEmail of attendees){
        User.findOne({email:attendeeEmail}, (err,user)=>{
            if(user) newMeeting.attendees.push(user.email);
        });
    }
}

const getAllMeettingsforUser= async (req, res, user)=>{
    const allMeetingsIds = user.meetings;
    let meetings = [];
    for(meetingId of allMeetingsIds){
        let meeting  = await Meeting.findById(meetingId)//, (err, doc)=>{
        meetings.push(meeting);
    }
    return res.status(200).send(meetings);
}


module.exports = {
    createMeeting,
    getmeetings,
    getMeetingdetails,
    dropUserfromMeeting,
}