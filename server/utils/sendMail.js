require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendMail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"LuxeMarket" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      html
    });
    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Email send error:', err);
    throw err;
  }
}

module.exports = sendMail;
