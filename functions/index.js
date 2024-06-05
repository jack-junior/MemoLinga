const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.pass,
  },
});

exports.sendEmailConfirmation = functions.firestore.document('emails/{emailId}')
  .onCreate(async (snap, context) => {
    const email = snap.data().email;

    const mailOptions = {
      from: functions.config().email.user,
      to: email,
      subject: 'Email Confirmation',
      text: `Thank you for registering your email address. Please confirm your email address by clicking the link below:\n\nhttps://your-app.com/confirm?email=${email}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
