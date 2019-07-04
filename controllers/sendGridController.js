const config = require("../config.json");
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(config.sendGrid.SENDGRID_API_KEY);

// module.exports = {
//     sendWelcomeEmail : function(req,res) {

//     const msg = {
//       to: req.params.email,
//       //replace with enatomy email
//       from: 'designbyinna@gmail.com',
//       subject: 'Welcome to Enatomy',
//       html:  '<body> <h1>' + req.params.name + '</h1>,' +
//     'Welcome to Enatomy. Hopefully you will find a lot of inspiration on our website' +
//     '</body>'
//     };
//     sgMail.send(msg);
//     // res.json({"test":"yep this is a simple route"})

//   } 
// }

const nodemailer = require("nodemailer");


module.exports = {
  sendWelcomeEmail: function (req, res) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.gmail.MAIL_USER,
        pass: config.gmail.MAIL_PASS
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });

    var mailOptions = {
      from: config.gmail.MAIL_USER,
      to: req.params.email,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}


// module.exports = {
//     sendWelcomeEmail : function(req,res) {

//     const msg = {
//       to: req.params.email,
//       //replace with enatomy email
//       from: 'designbyinna@gmail.com',
//       subject: 'Welcome to Enatomy',
//       html:  '<body> <h1>' + req.params.name + '</h1>,' +
//     'Welcome to Enatomy. Hopefully you will find a lot of inspiration on our website' +
//     '</body>'
//     };
//     sgMail.send(msg);
//     // res.json({"test":"yep this is a simple route"})

//   } 
// }