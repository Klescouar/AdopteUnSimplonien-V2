const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt  = require('bcryptjs');


const UserSchema = new Schema({
    firstName: String,
    company: String,
    technology : String,
    lastName: String,
    email: String,
    token: String,
    forgetPassToken: {
        type: String,
        default: ''
    },
    actif: {
        type: Boolean,
        default: false
    },
    password: {
          type: String,
          required: true
    },
    role: {
          type: String,
          enum: ['Recruteur', 'Simplonien', 'Admin', 'adminMaster'],
          default: 'Recruteur'
    }
});


UserSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
