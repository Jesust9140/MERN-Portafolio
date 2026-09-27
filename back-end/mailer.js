const nodemailer = require('nodemailer');

// Gmail SMTP transporter - requires EMAIL_USER (the Gmail address) and
// EMAIL_PASS (a Gmail App Password, not the regular account password) to be
// set in the environment. Falls back to a console-log placeholder when those
// aren't configured, so local dev without credentials doesn't crash.
const hasCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASS;

const transporter = hasCredentials
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  : null;

const sendMail = async ({ to, subject, body }) => {
  if (!transporter) {
    console.log('--- [placeholder email] EMAIL_USER/EMAIL_PASS not set, would send ---');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Body:', body);
    console.log('-----------------------------------------------------------------');
    return { sent: false, placeholder: true };
  }

  try {
    await transporter.sendMail({
      from: `"Jesus T." <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: body
    });
    return { sent: true };
  } catch (error) {
    console.error('Email send failed:', error.message);
    return { sent: false, error: error.message };
  }
};

module.exports = { sendMail };
