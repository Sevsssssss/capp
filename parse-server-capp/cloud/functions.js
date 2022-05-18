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

async function sendEmail(params = {}) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'chedcapp@gmail.com',
      pass: 'Ched123#',
    },
  });
  if (params.type == "sendStatusUpdate") {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"CAPP" <chedcapp@gmail.com>', // sender address
      to: params.email, // list of receivers
      subject: "CAPP Application Status", // Subject line
      text: params.status, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
  if (params.type == "sendCredentials") {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"CAPP Credentials ✔" <chedcapp@gmail.com>', // sender address
      to: params.email, // list of receivers
      subject: "Hello CAPP User!", // Subject line
      text: "Username: " + params.username
        + "\nPassword: " + params.password, // plain text body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
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
