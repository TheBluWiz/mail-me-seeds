const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  }
});

const options = {
  from: process.env.EMAIL_ADDRESS,
  to: process.env.TEST_RECIPIENT,
  subject: "The Seeds You Requested",
  text: `Thank you for requesting these heirloom seeds. They have been shipped!!
  
  Please do not respond to this email address as it is not monitored`
}

// example set of options
// const options = {
//  from: process.env.EMAIL_ADDRESS,
//  to: process.env.TEST_RECIPIENT,
//  subject: "The Seeds You Requested",
//  text: `Thank you for requesting these heirloom seeds. They have been shipped!!
// 
// Please do not respond to this email
// address as it is not monitored`
// 
// 



transporter.sendMail(options, (err, info) => {
  if (err) return console.log(err);
  console.log("Sent: " + info.response)
})