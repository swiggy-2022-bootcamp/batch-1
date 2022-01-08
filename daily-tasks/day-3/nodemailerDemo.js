var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ayan59dutta@gmail.com',
        pass: 'xxxxxxxxxxxxxxxxxxxxx'
    }
});

var mailOptions = {
    from: 'ayan59dutta@gmail.com',
    to: 'ayan59dutta@gmail.com, ayan95dutta@gmail.com',
    subject: 'Test Email using Node.js',
    html: '<h1>Welcome to Swiggy IPP Day 3</h1><br><p>This mail is sent using nodemailer!</p>'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});