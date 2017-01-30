const config      = require('../../config/database');
const Skill = require('../models/skill');

exports.getAllSkill = (req, res) => {
    console.log('I received a GET request');
    Skill.find( function(err, instrument) {
        if (err) throw err;

        else {
          res.json(instrument);
        }
    });
};

exports.removeSkill = (req, res) => {
    console.log('I received a GET request');
    Skill.findOneAndRemove({ _id: req.params.id}, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Skill removed!' });
    });
};


exports.addSkill =  function(req, res) {
  console.log(req.body);
   if (!req.body.name) {
     res.json({success: false, msg: 'Please pass all infos.'});
   } else {
     const newSkill = new Skill(req.body);
     // save the user
     newSkill.save(function(err) {
       if (err) {
         return res.json({success: false, msg: 'Skill already exists.'});
       }
       res.json({success: true, msg: 'Successful Add Song.'});
     });
   }
 };
