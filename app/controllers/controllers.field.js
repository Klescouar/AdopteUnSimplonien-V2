const config      = require('../../config/database');
const Field = require('../models/field');

exports.getAllField = (req, res) => {
    console.log('I received a GET request');
    Field.find( function(err, doc) {
        if (err) throw err;

        else {
          res.json(doc);
        }
    });
};

exports.removeField = (req, res) => {
    console.log('I received a GET request');
    Field.findOneAndRemove({ _id: req.params.id}, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Field removed!' });
    });
};


exports.addField =  function(req, res) {
  console.log(req.body);
   if (!req.body.name) {
     res.json({success: false, msg: 'Please pass all infos.'});
   } else {
     const newField = new Field(req.body);
     // save the user
     newField.save(function(err) {
       if (err) {
         return res.json({success: false, msg: 'Field already exists.'});
       }
       res.json({success: true, msg: 'Successful Add Field.'});
     });
   }
 };
