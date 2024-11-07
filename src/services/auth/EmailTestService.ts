import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

const mailOptions = {
  from: 'noreply@yourapp.com',
  to: 'hallanpf@gmail.com',
  subject: 'Test Email',
  text: 'Hello! This is a test email from Nodemailer.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(`Error: ${error}`);
  }
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
