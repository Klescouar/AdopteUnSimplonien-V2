const config      = require('../../config/database');
const Region = require('../models/region');

exports.getAllRegion = (req, res) => {
    console.log('I received a GET request');
    Region.find( function(err, doc) {
        if (err) throw err;

        else {
          res.json(doc);
        }
    });
};

exports.removeRegion = (req, res) => {
    console.log('I received a GET request');
    Region.findOneAndRemove({ _id: req.params.id}, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Region removed!' });
    });
};


exports.addRegion =  function(req, res) {
  console.log(req.body);
   if (!req.body.name) {
     res.json({success: false, msg: 'Please pass all infos.'});
   } else {
     const newRegion = new Region(req.body);
     // save the user
     newRegion.save(function(err) {
       if (err) {
         return res.json({success: false, msg: 'Region already exists.'});
       }
       res.json({success: true, msg: 'Successful Add Region.'});
     });
   }
 };
