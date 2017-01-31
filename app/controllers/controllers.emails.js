const nodemailer = require("nodemailer");
const layout = require('../models/mails.js');

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
