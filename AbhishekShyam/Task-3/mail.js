var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abhibenne@gmail.com',
    pass: 'Abhi@benne1234'
  }
});

var mailOptions = {
  from: mail,
  to: pass,
  subject: 'Sending Email using Node.js',
  text: 'Cool'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});