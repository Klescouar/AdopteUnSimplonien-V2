const User = require('../models/user');
const Student = require('../models/student');
const json2csv = require('json2csv');
const fs = require('fs');
const fieldsRecruiter = ['firstName', 'lastName', 'company', 'technology', 'email'];
const fieldsStudent = ['firstName', 'lastName', 'email'];
const fieldsStudentProfil = ['prenom', 'nom', 'age', 'region', 'tags', 'description', 'Sexe', 'Domaine', 'dispo', 'specialiteUn', 'specialiteDeux', 'specialiteTrois', 'Github', 'Linkedin', 'Portfolio', 'CV', 'Twitter', 'StackOverFlow', 'Mail', 'Contrat', 'promo', 'ProjetUn', 'ProjetDeux', 'ProjetTrois'];

exports.getCsvRecruiter = (req, res) => {
    console.log('I received a GET request');
    User.find({role: 'Recruteur'}, function(err, user) {
        if (err) throw err;
        else {
          const csv = json2csv({ data: user, fields: fieldsRecruiter });
          fs.writeFile(__dirname + '/../../dist/assets/csv/recruteur.csv', csv, function(err) {
            if (err) throw err;
            res.json({success: true, msg: 'file saved'});
          });
        }
    });
};

exports.getCsvStudent = (req, res) => {
    console.log('I received a GET request');
    User.find({role: 'Simplonien'}, function(err, user) {
        if (err) throw err;
        else {
          const csv = json2csv({ data: user, fields: fieldsStudent });
          fs.writeFile(__dirname + '/../../dist/assets/csv/simplonien.csv', csv, function(err) {
            if (err) throw err;
            res.json({success: true, msg: 'file saved'});
          });
        }
    });
};

exports.getCsvStudentProfil = (req, res) => {
    console.log('I received a GET request');
    Student.find(function(err, docs) {
        if (err) throw err;
        else {
          const csv = json2csv({ data: docs, fields: fieldsStudentProfil });
          fs.writeFile(__dirname + '/../../dist/assets/csv/simplonienProfil.csv', csv, function(err) {
            if (err) throw err;
            res.json({success: true, msg: 'file saved'});
          });
        }
    });
};
