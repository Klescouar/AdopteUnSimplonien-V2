const mongojs = require('mongojs');
const db = mongojs('mongodb://Poncho:simplonien@ds127928.mlab.com:27928/adopte-un-simplonien', ['simplonien']);

exports.infoStudent = (req, res) => {
    console.log('I received a GET request');
    db.simplonien.find(function(err, docs) {
        res.json(docs);
    });
};

exports.findStudent = (req, res) => {
    console.log('I received a GET request');
    const id = req.params.id_profil;
    db.simplonien.findOne({
        _id: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.json(doc);
    });
};

exports.findStudentByMemberId = (req, res) => {
    console.log('I received a GET request');
    const memberId = req.params.memberId;
    db.simplonien.findOne({
        memberId: memberId
    }, function(err, doc) {
        res.json(doc);
    });
};

exports.removeStudent = (req, res) => {
    console.log('I received a GET request');
    const id = req.params.id_profil;
    db.simplonien.remove({
        _id: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.json(doc);
    });
};

exports.addStudent = (req, res) => {
    const memberId = req.body.memberId;
    console.log('I received a GET request');
    db.simplonien.findOne({
        memberId: memberId
    }, function(err, doc) {
        const p = new Promise((resolve, reject) => {
            doc ? resolve() : reject();
        });
        p.then(function() {
            res.send('error')
        }, function() {
            db.simplonien.insert(req.body, function(err, doc) {
                res.json(doc);
            });
        })
    });
};

exports.updateStudent = (req, res) => {
    if (!req.body.length) {
        const id = req.params.id;
        db.simplonien.findAndModify({
            query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                $set: {
                    verified: true
                }
            },
            new: true
        }, (err, doc) => {
            res.json(doc);
        });
    } else {

        const id = req.params.id;
        db.simplonien.findAndModify({
            query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                $set: {
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    age: req.body.age,
                    ville: req.body.ville,
                    photo: req.body.photo,
                    tags: req.body.tags,
                    description: req.body.description,
                    Sexe: req.body.Sexe,
                    SpecialiteUn: req.body.SpecialiteUn,
                    SpecialiteDeux: req.body.SpecialiteDeux,
                    SpecialiteTrois: req.body.SpecialiteTrois,
                    Github: req.body.Github,
                    Linkedin: req.body.Linkedin,
                    Portfolio: req.body.Portfolio,
                    CV: req.body.CV,
                    Twitter: req.body.Twitter,
                    StackOverFlow: req.body.StackOverFlow,
                    Mail: req.body.Mail,
                    Contrat: req.body.Contrat,
                    DatePromo: req.body.DatePromo,
                    Domaine: req.body.Domaine
                }
            },
            new: true
        }, (err, doc) => {
            res.json(doc);
        });
    }
};
