const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    // Activate less secure App for email
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD,
    },
  });
  // defined the email options
  const mailOptions = {
    from: 'Adetayo Akinsanya <hello@pandablog.io>',
    to: option.email,
    text: options.message,
  };
  // Send the email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
