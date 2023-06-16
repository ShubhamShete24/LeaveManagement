import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (receipientList, subject, body) => {
  const responseData = {
    data: null,
    message: ''
  };
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'arunangshu.biswas.x@gmail.com',
      pass: process.env.EMAIL_AUTH_PASSWORD
    }
  });
  try {
    const response = await smtpTransport.sendMail({
      from: 'arunangshu.biswas.x@gmail.com',
      to: receipientList,
      subject,
      html: body
    });
    responseData.data = response;
    responseData.message = `Mail sent successfully`;
  } catch (err) {
    responseData.data = null;
    responseData.message = `${err.message} There was an issue sending the email.`;
  }
  return responseData;
};

const notifyByEmail = async (req, res) => {
  const { receipientList, body, subject } = req.body;
  let responseData = {
    data: null,
    message: '',
    status: 400
  };
  try {
    responseData = await sendEmail(receipientList, subject, body);
    responseData.status = 200;
  } catch (e) {
    responseData.status = 500;
    responseData.message = `${e.message}`;
  }
  res.status(responseData.status).send(responseData);
};

export { notifyByEmail, sendEmail };
