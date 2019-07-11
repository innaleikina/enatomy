const config = require("../config.json");
const nodemailer = require("nodemailer");
// const User = require('../user.model')
// const sendEmail = require('./email.send')
// const msgs = require('./email.msgs')
// const templates = require('./email.templates')



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
      subject: 'Welcome to Enatomy',
      html: '<body> <h1>' + req.params.name + ', </h1>' +
          'Welcome to Enatomy. Hopefully you will find a lot of inspiration on our website </body>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  },
  

  sendPasswordReset:function(req,res){

  },

  sendPurchaseReceipt:function(req,res){

  }
}


// module.exports = {
//     sendWelcomeEmail : function(req,res) {

//     const msg = {
//       to: req.params.email,
//       //replace with enatomy email
//       from: 'designbyinna@gmail.com',
//       subject: 'Welcome to Enatomy',
//       html:  
//     };
//     sgMail.send(msg);
//     // res.json({"test":"yep this is a simple route"})

//   } 
// }


// The callback that is invoked when the user submits the form on the client.
