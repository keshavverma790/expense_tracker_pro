const nodemailer = require("nodemailer");

const emailManager = async (to, text, subject) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "603cc42509850c",
      pass: "80a9035557c5ec",
    },
  });

  await transport.sendMail({
    to: to,
    from: "info@expensetrackerpro.com",
    text: text,
    subject: subject,
  });
};

module.exports = emailManager;
