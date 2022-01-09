const nodemailer = require("nodemailer");

function mailUser(mailId,userName) { 
  const welcomeMessage=`
<h3>Welcome ${userName}!</h3>
<p>Enjoy our Food Fest sale this weekend.</p>`;
   
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

