const nodemailer = require("nodemailer");
const express = require("express");
const route = express.Router();

route.post('/send-mail', (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "projectjobhunt1@gmail.com",
      pass: "exaapjrawlemoheg",
    },
  });
console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  const htmlTemplate = `NAME:${req.body.name} <br>
                        SUBJECT:${req.body.subject} <br>
                        MESSAGE:${req.body.message} <br>
                        EMAIL:${req.body.email} `

  async function main() {
    const info = await transporter.sendMail({
      from: '"GREENY" <projectjobhunt1@gmail.com>', // sender address
      to: "alberthaciverdiyev55@gmail.com", // list of receivers
      subject: "NO REPLY", // Subject line
      text: "", // plain text body
      html: htmlTemplate, // html body
    });

  }

  main().catch(console.error);
})
module.exports = route;
