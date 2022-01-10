const express = require('express');
const meetingController = require('../controllers/meetingController');
const auth = require('../service/auth');

const meetingRouter = express.Router();

meetingRouter.post('/createMeeting', meetingController.createMeeting)
meetingRouter.get('/getMeetingsforUser', meetingController.getmeetings)
meetingRouter.get('/getMeetingDetails', meetingController.getMeetingdetails)
meetingRouter.delete('/dropfromMeeting', meetingController.dropUserfromMeeting)

module.exports = meetingRouter;