const nodemailer = require('nodemailer');
require('dotenv').config()


var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
         type: "login",
         user: process.env.EMAIL,
         pass: process.env.PASSWORD
     }
 });

//sendMail(config).catch(console.error);
// Nodemailer has a lot of available settings, therefore read the docs of nodemailer.
module.exports= transporter