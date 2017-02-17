const config  = require('../../config/database');
const Student = require('../models/student');

exports.infoStudent = (req, res) => {
    console.log('I received a GET request');
    Student.find(function(err, docs) {
      if (err) {
        throw error;
      } else {
        res.json(docs);
      }
    });
};

exports.findStudent = (req, res) => {
  console.log(req.params.id_profil);
    console.log('I received a GET request');
    const id = req.params.id_profil;
    Student.findById(id, function (err, doc) {
      if (err) {
        throw error;
      } else {
        res.json(doc);
      }
    });
};

exports.findStudentByMemberId = (req, res) => {
    console.log('I received a GET request');
    const memberId = req.params.memberId;
    Student.findOne({
      memberId: memberId
    }, function(err, doc) {
        if (!doc) {
          return res.json({success: false, msg: 'Student doesn\'t exists.'});
        } else if (err) {
          return res.json({success: false, msg: 'Student doesn\'t have profil.'});
        } else {
          return res.json(doc)
        }
    });
};

exports.removeStudent = (req, res) => {
    console.log('I received a GET request');
    const id = req.params.id_profil;
    Student.findOneAndRemove({ _id: id}, function(err) {
      if (err) {
        res.send(err)
      } else {
        res.json({ message: 'Student removed!' });
      }
    });
};

exports.addStudent = (req, res) => {
    const memberId = req.body.memberId;
    console.log('I received a GET request');
    Student.findOne({
        memberId: memberId
    }, function(err, doc) {
        const p = new Promise((resolve, reject) => {
            doc ? resolve() : reject();
        });
        p.then(function() {
            res.send('error')
        }, function() {
          const newStudent = new Student(req.body);
          newStudent.save(function(err) {
            if (err) {
              return res.json({success: false, msg: 'Student already exists.'});
            } else {
              return res.json({success: true, msg: 'Successful Add Student.'});
            }
          });
        })
    });
};

exports.addStudentFromAdmin =  function(req, res) {
  console.log(req.body);
  if (!req.body.nom || !req.body.prenom) {
    res.json({success: false, msg: 'Please pass all infos.'});
  } else {
    const newStudent = new Student(req.body);
    newStudent.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Student already exists.'});
      } else {
        return res.json({success: true, msg: 'Successful Add Student.'});
      }
    });
  }
 };

exports.updateStudent = (req, res) => {
    if (!req.body.nom) {
      const id = req.params.id;
      Student.findById(id, function (err, doc) {
          if (err) {
              res.status(500).send(err);
          } else {
            doc.verified = true,
              doc.save(function (err, doc) {
                  if (err) {
                      res.status(500).send(err)
                  }
                  res.send(doc);
              });
          }
      });
    } else {
      const id = req.params.id;
      Student.findById(id, function (err, doc) {
          if (err) {
              res.status(500).send(err);
          } else {
            doc.nom = req.body.nom,
            doc.prenom = req.body.prenom,
            doc.age = req.body.age,
            doc.region = req.body.region,
            doc.photo = req.body.photo,
            doc.tags = req.body.tags,
            doc.description = req.body.description,
            doc.Sexe = req.body.Sexe,
            doc.dispo = req.body.dispo,
            doc.SpecialiteUn = req.body.SpecialiteUn,
            doc.SpecialiteDeux = req.body.SpecialiteDeux,
            doc.SpecialiteTrois = req.body.SpecialiteTrois,
            doc.Github = req.body.Github,
            doc.Linkedin = req.body.Linkedin,
            doc.Portfolio = req.body.Portfolio,
            doc.CV = req.body.CV,
            doc.Twitter = req.body.Twitter,
            doc.StackOverFlow = req.body.StackOverFlow,
            doc.Mail = req.body.Mail,
            doc.Contrat = req.body.Contrat,
            doc.promo = req.body.promo,
            doc.Domaine = req.body.Domaine,
            doc.ProjetUn = req.body.ProjetUn,
            doc.ProjetDeux = req.body.ProjetDeux,
            doc.ProjetTrois = req.body.ProjetTrois
            doc.save(function (err, doc) {
                  if (err) {
                      res.status(500).send(err)
                  }
                  res.send(doc);
              });
          }
      });
    }
};
