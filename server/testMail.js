require('dotenv').config();
const sendMail = require('./utils/sendMail');

(async () => {
  try {
    await sendMail({
      to: 'vr9008022821@gmail.com',
      subject: 'Brevo Test Email',
      html: '<h2>Hello from Brevo!</h2><p>This is a test email sent via Brevo SMTP + Nodemailer.</p>'
    });
    console.log('✅ Test mail sent successfully');
  } catch (err) {
    console.error('❌ Test mail failed:', err);
  }
})();
