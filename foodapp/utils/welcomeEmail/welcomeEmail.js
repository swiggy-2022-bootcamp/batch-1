const nodemailer = require("nodemailer");

//const userTemplate=require('./mailcontact');
// const generateOtp=require('../generateotp');
function mailUser(mailId,userName) { 
  const welcomeMessage=`
<h3>Welcome ${userName}!</h3>
<p>Enjoy our Food Fest sale this weekend.</p>`;
    // let generateOtpOrder=generateOtp.generateOrderOtp();
   // userTemplate(mailId,Password).then(data=> {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'chahat14bhatia@gmail.com',
          pass: 'Chahat@123' 
           }
       });
       const mailOptions = {
        from: 'chahat14bhatia@gmail.com',  
        to: mailId, 
        subject: "Welcome to Your Own Food Delivery App", 
        html: welcomeMessage 
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
    
    
}
module.exports=mailUser;




// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'chahat14bhatia@gmail.com',
//     pass: 'Chahat@123'
//   }
// });

// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   html: welcomeMessage
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
