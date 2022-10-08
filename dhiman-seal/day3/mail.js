var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testaccount1@gmail.com',
        pass: 'hidden_in_commit'
    }
});

var mailOptions = {
    from: 'testaccount1@gmail.com',
    to: 'testaccount2@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});