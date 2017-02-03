const nodemailer = require("nodemailer");
const layout = require('../models/mails.js');
const sendPassLink = require('../models/mails.js').passLink;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Test.project.simplon@gmail.com',
        pass: 'KevJeanYassMat'
    }
});

exports.contactMail = (req, res) => {
    let html = layout[req.body.layout](req.body);

    let mailOptions = {
        from: req.body.sender,
        to: req.body.to,
        subject: `Contact de ${req.body.sender}`,
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
    });
};

exports.sendMailForPass = (req, res) => {
  console.log(req.body);
    let html = sendPassLink(req.body);

    let mailOptions = {
        from: 'lescouarneckevin@yahoo.fr',
        to: req.body.mail,
        subject:'Nouveau mot de passe',
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
    });
};
