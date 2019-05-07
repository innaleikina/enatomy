const config = require("../config.json");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendGrid.SENDGRID_API_KEY);

module.exports = {
    sendWelcomeEmail : function(req,res) {
   
    const msg = {
      to: req.params.email,
      //replace with enatomy email
      from: 'designbyinna@gmail.com',
      subject: 'Welcome to Enatomy',
      html:  '<body> <h1>' + req.params.name + '</h1>,' +
    'Welcome to Enatomy. Hopefully you will find a lot of inspiration on our website' +
    '</body>'
    };
    sgMail.send(msg);
    // res.json({"test":"yep this is a simple route"})

  } 
}