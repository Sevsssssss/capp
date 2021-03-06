process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

Parse.Cloud.define('hello', req => {
  req.log.info(req);
  return 'Hi';
});

Parse.Cloud.define('asyncFunction', async req => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  req.log.info(req);
  return 'Hi async';
});

Parse.Cloud.beforeSave('Test', () => {
  throw new Parse.Error(9001, 'Saving test objects is not available.');
});

const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

async function sendEmail(params = {}) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'chedcapp@gmail.com',
      pass: 'Ched123#',
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
  };

  transporter.use('compile', hbs(handlebarOptions))

  if (params.type == "sendStatusUpdate") {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"CAPP" <chedcapp@gmail.com>', // sender address
      to: params.email, // list of receivers
      subject: "Application Status", // Subject line
      template: 'status',
      context:{
        status: params.status,
      },
    });

  }
  if (params.type == "sendCredentials") {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"CAPP Credentials" <chedcapp@gmail.com>', // sender address
      to: params.email, // list of receivers
      subject: "Hello CAPP User!", // Subject line
      template: 'credentials',
      context:{
        username: params.username,
        password: params.password
      }
    });

  }

}

Parse.Cloud.define("sendEmailNotification", async (request) => {
  if (request.params.approved) {
    sendEmail(request.params).then(function () {
      return 'ok'
    }, (error) => {
      console.log(error)
      throw new Error(error)
    })
  }
});

Parse.Cloud.define("sendStatusUpdate", async (request) => {
  if (request.params.approved) {
    sendEmail(request.params).then(function () {
      return 'ok'
    }, (error) => {
      console.log(error)
      throw new Error(error)
    })
  }
});