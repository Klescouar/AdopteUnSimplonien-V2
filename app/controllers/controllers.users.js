const User        = require('../models/user');
const jwt         = require('jwt-simple');
const config      = require('../../config/database');


exports.authenticate = function(req, res) {
   User.findOne({
     email: req.body.email
   }, function(err, user) {
     if (err) throw err;

     if (!user) {
       res.send({success: false, msg: 'Authentication failed. User not found.'});
     } else {
       // check if password matches
       user.comparePassword(req.body.password, function (err, isMatch) {
         if (isMatch && !err) {
           // if user is found and password is right create a token
           const token = jwt.encode(user, config.secret);
           // return the information including token as JSON
           res.json({success: true, token: 'JWT ' + token, user:user});
         } else {
           res.send({success: false, msg: 'Authentication failed. Wrong password.'});
         }
       });
     }
   });
 };


exports.signup =  function(req, res) {
   if (!req.body.email || !req.body.password) {
     res.json({success: false, msg: 'Please pass name and password.'});
   } else {
     const newUser = new User(req.body);
     // save the user
     newUser.save(function(err) {
       if (err) {
         return res.json({success: false, msg: 'email already exists.'});
       }
       res.json({success: true, msg: 'Successful created new user.'});
     });
   }
 };


exports.RecruiterUsers = function(req, res) {
   const token = getToken(req.headers);
   if (token) {
     const decoded = jwt.decode(token, config.secret);
     User.find( function(err, user) {
         if (err) throw err;

         else {
           res.json({success: true, msg: 'Welcome in the member area ' + user.email + '!', user: user});
         }
     });
   } else {
     return res.status(403).send({success: false, msg: 'No token provided.'});
   }
 };

 exports.SimplonienUsers = function(req, res) {
    const token = getToken(req.headers);
    if (token) {
      const decoded = jwt.decode(token, config.secret);
      User.find({role: 'Simplonien'}, function(err, user) {
          if (err) throw err;

          else {
            res.json({success: true, msg: 'Welcome in the member area ' + user.email + '!', user: user});
          }
      });
    } else {
      return res.status(403).send({success: false, msg: 'No token provided.'});
    }
  };

exports.memberinfo = function(req, res) {
   const token = getToken(req.headers);
   if (token) {
     const decoded = jwt.decode(token, config.secret);
     User.findOne({
       email: decoded.email
     }, function(err, user) {
         if (err) throw err;

         if (!user) {
           return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
         } else {
           res.json({success: true, msg: 'Welcome in the member area ' + user.email + '!', user: user});
         }
     });
   } else {
     return res.status(403).send({success: false, msg: 'No token provided.'});
   }
 };


 getToken = function (headers) {
   if (headers && headers.authorization) {
     const parted = headers.authorization.split(' ');
     if (parted.length === 2) {
       return parted[1];
     } else {
       return null;
     }
   } else {
     return null;
   }
 };

 exports.remove = function(req, res) {
   console.log(req.params.id);
  const token = getToken(req.headers);
  if (token) {
   const decoded = jwt.decode(token, config.secret);
   User.findOneAndRemove({ _id: req.params.id}, function(err) {
     if (err)
       res.send(err);

     res.json({ message: 'User removed!' });
   });
  }
 };
