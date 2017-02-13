const config      = require('../../config/database');
const Promo = require('../models/promo');

exports.getAllPromo = (req, res) => {
    console.log('I received a GET request');
    Promo.find( function(err, doc) {
        if (err) throw err;

        else {
          res.json(doc);
        }
    });
};

exports.removePromo = (req, res) => {
    console.log('I received a GET request');
    Promo.findOneAndRemove({ _id: req.params.id}, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Promo removed!' });
    });
};


exports.addPromo =  function(req, res) {
  console.log(req.body);
   if (!req.body.name) {
     res.json({success: false, msg: 'Please pass all infos.'});
   } else {
     const newPromo = new Promo(req.body);
     // save the user
     newPromo.save(function(err) {
       if (err) {
         return res.json({success: false, msg: 'Promo already exists.'});
       }
       res.json({success: true, msg: 'Successful Add Song.'});
     });
   }
 };
