const nodemailer = require("nodemailer");
const layout = require('../models/mails.js');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email',
        pass: 'mdp'
    }
});

exports.contactMail = (req, res) => {
    let html = layout.contact(req.body);

    let mailOptions = {
        from: req.body.sender, // sender address
        to: 'email', // list of receivers
        subject: `Contact de ${req.body.name}`, // Subject line
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
    });
};
