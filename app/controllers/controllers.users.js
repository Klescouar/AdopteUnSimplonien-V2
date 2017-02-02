const User        = require('../models/user');
const jwt         = require('jwt-simple');
const config      = require('../../config/database');
const payload     = { foo: 'bar' };


exports.updateUser = function(req, res) {
        const id = req.params.id;
        User.findById(req.params.id, function (err, doc) {
            if (err) {
                res.status(500).send(err);
            } else {
              doc.firstName = req.body.firstName,
              doc.lastName = req.body.lastName,
              doc.company = req.body.company,
              doc.email = req.body.email,
                doc.save(function (err, doc) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.send(doc);
                });
            }
        });
};


exports.updateUserPassFromProfil = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user) {
          return res.json({success: false, msg: 'Email doesn\'t exists.'});
        } else {
          user.comparePassword(req.body.oldpass, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              const token = jwt.encode(user, config.secret);
              // return the information including token as JSON
                user.password = req.body.newpass,
                user.save(function(err) {
                    if (err) {
                        return res.json({success: false, msg: 'Email already exists.'});
                    }
                    res.json({success: true, msg: 'Successful update password.'});
                });
              res.json({success: true, token: 'JWT ' + token, user:user, msg: 'Successful update password.'});
            } else {
              res.send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
          });
        }
    });
};

exports.resetPass = function(req, res) {
    User.findOne({
      email: req.body.data.mail
    }, function(err, user) {
        if (!user) {
          return res.json({success: false, msg: 'Email doesn\'t exists.'});
        } else {
              // if user is found and password is right create a token
              const token = jwt.encode(user, config.secret);
              // return the information including token as JSON
                user.password = req.body.pass,
                user.save(function(err) {
                    if (err) {
                        return res.json({success: false, msg: 'Email already exists.'});
                    }
                    res.json({success: true, msg: 'Successful update password.'});
                });
        }
    });
};


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

 exports.createToken = function(req, res){
   const token = jwt.encode(req.params.mail, config.secret);
   res.json(token);
 };

exports.signup =  function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (!user){
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
    } else {
       res.json({success: false, msg: 'Email already used'});
    }
  });
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
