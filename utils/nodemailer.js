const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

const theFerryman  = function (options) {
  transporter.sendMail(options, (err, info) => {
    if (err) return console.log(err);
    console.log("Sent: " + info.response)
  })
}

const sendmail = function (name, recipient, messageType, customLink) {
  switch (messageType) {
    case 'password':
      const options = {
        from: process.env.EMAIL_ADDRESS,
        to: recipient,
        subject: "Password Reset Request",
        text: `<pre>Hi ${name},\n\nForgot your password?\nWe received a request to reset the password for your account.\n\nTo reset your password, click on the button below:\n</pre><a href="https://localhost:3001/${customLink}><button>Reset Password</button></a><pre>\n\nOr copy and paste the URL into your browser:\n<a href="https://localhost:3001/${customLink}>https://localhost:3001/${customLink}</a>`
      }
      theFerryman(options);
      break;
    case 'request':
      break;
    case 'incoming':
      break;
  }
}

user = req.session.user
sendmail("Jamey Wicklund", "jamey_w@icloud.com", "password", "localhost:3001/resetpassword/asdl;fkjf")

