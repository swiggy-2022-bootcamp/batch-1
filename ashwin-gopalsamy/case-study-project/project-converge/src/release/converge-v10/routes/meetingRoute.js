//Import Express library.
const meetingRouter = require('express').Router();
const meetingData = require('../data/meetingData').meetingDB;
const accountAuthController = require('../controller/accountAuthController');
const JWT = require("jsonwebtoken");

//GET All Meeting Details
meetingRouter.get("/",(req,res)=>{
    res.json(meetingData);
});

//POST - Create a new meeting
meetingRouter.post("/",async (req, res, next) => {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({
                "message": "Access Denied"
            });
        };
        try {
            let user = await JWT.verify(token, "141fqj1rqfjm1ng10f1rtqwv");
            req.user = user.email;
            next();
        } catch (error) {
            return res.status(401).json({
                "errors": [{
                    "msg": "Invalid JWT Token"
                }]
            });
        }
    },(req,res)=>{

    const meetingId = req.user;
    const dateOfMeeting = req.body.dateOfMeeting;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const description = req.body.description;
    const emailIdsOfAttendees = req.emailIdsOfAttendees;

    meetingData.push({
        meetingId,
        dateOfMeeting,
        startTime,
        endTime,
        description,
        emailIdsOfAttendees
    });

    res.status(200).json({
        "message": "Meeting Successfully created"
    });
});

//SEARCH Meeting using User ID:
meetingRouter.get("/user/meetings",(req,res)=>{
    const givenMeetingId = req.body.meetingId;
    let meeting = meetingData.find((meeting)=>{
        return meeting.meetingId = givenMeetingId;
    });
    if(!meeting){
        return res.status(400).json({
            "message":"Meeting ID does not exist"
        });
    }
    res.status(200).json(meetingData.filter(id=>id.meetingId===(req.body.meetingId)));
});


//DELETE - Drop off from a meeting
meetingRouter.delete("/user/meetings/meetingId",(req,res)=>{
    const givenMeetingId = req.body.meetingId;
    console.log(givenMeetingId);
    let meeting = meetingData.find((meeting) => {
        return meeting.meetingId = givenMeetingId;
    });
    if(meeting){
        meetingData.splice(meetingData.findIndex(id => id.meetingId === (req.body.meetingId)));
        return res.json({"message":"You are dropped off from the meeting"});
    }
    return res.json(
            {
                "message":"Meeting ID doesn't exist"
            }
        )
    });

//Export meetingRouter module
module.exports = meetingRouter;