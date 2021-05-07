const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    // Activate less secure App for email
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // defined the email options
  const mailOptions = {
    from: 'Adetayo Akinsanya <hello@pandablog.io>',
    to: option.email,
    subject: option.subject,
    html: option.message,
    // html: option.message,
  };
  // Send the email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
