import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (req, res) => {
  const { receipientList, body, subject } = req.body;
  const responseData = {
    data: null,
    message: ''
  };

  try {
    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'arunangshu.biswas.x@gmail.com',
        pass: process.env.EMAIL_AUTH_PASSWORD
      }
    });
    smtpTransport
      .sendMail({
        from: 'arunangshu.biswas.x@gmail.com',
        to: receipientList,
        subject,
        html: body
      })
      .then((response) => {
        responseData.data = response;
        responseData.message = 'Mail was sent';
        res.status(200).send(responseData);
      })
      .catch((err) => {
        responseData.data = null;
        responseData.message = `${err.message} There was an issue sending the email.`;
        res.status(400).send(responseData);
      });
  } catch (e) {
    responseData.message = `${e.message}`;
    res.status(500).send(responseData);
  }
};
export default sendEmail;
