const config      = require('../../config/database');
const School = require('../models/school');

exports.getAllSchool = (req, res) => {
    console.log('I received a GET request');
    School.find( function(err, length) {
        if (err) throw err;

        else {
          res.json(length);
        }
    });
};

exports.removeSchool = (req, res) => {
    console.log('I received a GET request');
    School.findOneAndRemove({ _id: req.params.id}, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'School removed!' });
    });
};


exports.addSchool =  function(req, res) {
   if (!req.body.name) {
     res.json({success: false, msg: 'Please pass all infos.'});
   } else {
     const newSchool = new School(req.body);
     // save the user
     newSchool.save(function(err) {
       if (err) {
         return res.json({success: false, msg: 'School already exists.'});
       }
       res.json({success: true, msg: 'Successful Add School.'});
     });
   }
 };
