const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = function (message) {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log("Sent: " + info.response);
  });
};

const theFerryman = function (user, messageType, customLink) {
  const message = {
    from: process.env.EMAIL_ADDRESS,
    to: user.email,
  };
  switch (messageType) {
    case "password":
      message.subject = "Password Reset Request";
      message.html = `<pre>Hi ${user.name},\n\nForgot your password?\nWe received a request to reset the password for your account.\n\nTo reset your password, click on the link below:\n</pre>http://localhost:3001/user/updatepassword/${customLink}`;

      break;
    case "request":
      message.subject = "Seeds Requested";
      message.html = `<pre>Hi ${user.name},\n\nSomeone is interested in one of the seeds you offered.\n\nClick the link below to view the request.</pre>\n\nhttp://localhost:3001/offers/checkRequests/${customLink}`
      break;
    case "shipping":
      message.subject = "Seeds Incoming!!";
      message.html = `<pre>Hi ${user.name},\n\nThe seeds you requested have shipped!\n\nMake sure to leave a rating for the seeds here:</pre>\n\nhttp://localhost:3001/${customLink}`
      break;
  }
  sendMail(message);
};

module.exports = theFerryman;

// The Ferryman variables:
// 
// user is an object containing the users name
// Example:
// user = {
//  name: "Jamey Wicklund",
//  email: "noreply@mailmeseeds.com"
// }
// 
// messageType specifies which email template to use
// password - send a reset password link
// request - Infrom a user their seeds were requested
// shipping - Inform a user seeds have shipped
// 
// customLink - unique link for user to follow up with