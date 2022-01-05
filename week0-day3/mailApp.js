const nodemailer = require('nodemailer');
var http = require('http');

const server = http.createServer(async (req, res) => {
  if (req.url === '/send-mail' && req.method === 'GET') {
    const fromMail = 'akshaykrdecepticon@gmail.com';
    const toMail = 'akshaykrcc@live.com';

    const subject = 'Test Mail 1';
    const text = 'Test content';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: fromMail,
        pass: '', // removed passowrd before commiting code
      },
    });

    const mailOptions = {
      from: fromMail,
      to: toMail,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
      }
      console.log(response);
    });

    res.writeHead(200);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

server.listen(8080, () => {
  console.log(`server started on port: ${PORT}`);
});
