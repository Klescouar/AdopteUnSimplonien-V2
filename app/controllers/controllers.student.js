const mongojs = require('mongojs');
const db = mongojs('mongodb://Poncho:simplonien@ds127928.mlab.com:27928/adopte-un-simplonien', ['simplonien']);

exports.infoStudent = function(req, res) {
    console.log('I received a GET request');
    db.simplonien.find(function(err, docs) {
        res.json(docs);
    });
};

exports.findStudent = function(req, res) {
    console.log('I received a GET request');
    const id = req.params.id_profil;
    db.simplonien.findOne({
        _id: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.json(doc);
    });
};

exports.removeStudent = function(req, res) {
    console.log('I received a GET request');
    const id = req.params.id_profil;
    db.simplonien.remove({
        _id: mongojs.ObjectId(id)
    }, function(err, doc) {
        res.json(doc);
    });
};

exports.addStudent = function(req, res) {
    db.simplonien.insert(req.body, function(err, doc) {
        res.json(doc);
    });
};


exports.updateStudent = function(req, res) {
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
    }, function(err, doc) {
        res.json(doc);
    });
};
