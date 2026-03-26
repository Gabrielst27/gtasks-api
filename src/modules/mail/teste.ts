import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  auth: {
    user: '8684a89e571c30',
    pass: 'ac20ef2921de63',
  },
});

transporter.verify().then(console.log).catch(console.error);
