const config      = require('../../config/database');
const Contract = require('../models/contract');

exports.getAllContract = (req, res) => {
    console.log('I received a GET request');
    Contract.find( function(err, style) {
        if (err) throw err;

        else {
          res.json(style);
        }
    });
};

exports.removeContract = (req, res) => {
    console.log('I received a GET request');
    Contract.findOneAndRemove({ _id: req.params.id}, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Contract removed!' });
    });
};


exports.addContract =  function(req, res) {
   if (!req.body.name) {
     res.json({success: false, msg: 'Please pass all infos.'});
   } else {
     const newContract = new Contract(req.body);
     // save the user
     newContract.save(function(err) {
       if (err) {
         return res.json({success: false, msg: 'Contract already exists.'});
       }
       res.json({success: true, msg: 'Successful Add Contract.'});
     });
   }
 };
