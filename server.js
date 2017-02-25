const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const jwt = require('jwt-simple');
const fs = require('fs');
const formidable = require('formidable');
const readChunk = require('read-chunk');
const fileType = require('file-type');
const config = require(__dirname + '/config/database');
const User = require(__dirname + '/app/models/user');
const port = require(__dirname + '/config');
const user = require(__dirname + '/app/controllers/controllers.users');
const upload = require(__dirname + '/app/controllers/controllers.upload');
const student = require(__dirname + '/app/controllers/controllers.student');
const skill = require(__dirname + '/app/controllers/controllers.skills');
const contract = require(__dirname + '/app/controllers/controllers.contracts');
const school = require(__dirname + '/app/controllers/controllers.schools');
const promo = require(__dirname + '/app/controllers/controllers.promo');
const email = require(__dirname + '/app/controllers/controllers.emails');
const region = require(__dirname + '/app/controllers/controllers.region');
const csv = require(__dirname + '/app/controllers/controllers.csv');
const field = require(__dirname + '/app/controllers/controllers.field');
const apiRoutes = express.Router();
const nodemailer = require("nodemailer");

require(__dirname + '/config/passport')(passport);

// CONFIGURATION
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.use(function(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
    next();
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/dist'));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

// PASSPORT
app.use(passport.initialize());

// INITIALIZE APP
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/app/index.html'));
});

// connect to database
const database = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || config.database;
mongoose.connect(database);

apiRoutes.post('/upload_photos', upload.upload);

/////////////////////////USER CONTROLLER/////////////////////////
apiRoutes.post('/signup', user.signup);
apiRoutes.post('/authenticate', user.authenticate);
apiRoutes.post('/valid/mail', user.validMail);
apiRoutes.post('/forget/pass/:mail' , user.forgetPassword);
apiRoutes.get('/users', passport.authenticate('jwt', {session: false}), user.getAllUser);
apiRoutes.put('/update/user/:id', passport.authenticate('jwt', {session: false}), user.updateUser);
apiRoutes.put('/update/pass/profil/:id', passport.authenticate('jwt', {session: false}), user.updateUserPassFromProfil);
apiRoutes.put('/update/pass/reset', user.resetPass);
apiRoutes.get('/memberinfo', user.memberinfo);
apiRoutes.delete('/memberinfo/delete/:id', passport.authenticate('jwt', {session: false}),  passport.authenticate('jwt', {session: false}), user.remove);
apiRoutes.get('/csv/recruiter', passport.authenticate('jwt', {session: false}), csv.getCsvRecruiter);
apiRoutes.get('/csv/student', passport.authenticate('jwt', {session: false}), csv.getCsvStudent);
apiRoutes.get('/csv/studentProfil', passport.authenticate('jwt', {session: false}), csv.getCsvStudentProfil);

/////////////////////////SKILLS CONTROLLER/////////////////////////
apiRoutes.post('/addSkill', passport.authenticate('jwt', {session: false}), skill.addSkill);
apiRoutes.get('/getAllSkill', skill.getAllSkill);
apiRoutes.delete('/removeSkill/:id', passport.authenticate('jwt', {session: false}), skill.removeSkill);

/////////////////////////CONTRACTS CONTROLLER/////////////////////////
apiRoutes.post('/addContract', passport.authenticate('jwt', {session: false}), contract.addContract);
apiRoutes.get('/getAllContract', contract.getAllContract);
apiRoutes.delete('/removeContract/:id', passport.authenticate('jwt', {session: false}), contract.removeContract);

/////////////////////////SCHOOLS CONTROLLER/////////////////////////
apiRoutes.post('/addSchool', passport.authenticate('jwt', {session: false}), school.addSchool);
apiRoutes.get('/getAllSchool', school.getAllSchool);
apiRoutes.delete('/removeSchool/:id', passport.authenticate('jwt', {session: false}), school.removeSchool);

/////////////////////////REGION CONTROLLER/////////////////////////
apiRoutes.post('/addRegion', passport.authenticate('jwt', {session: false}), region.addRegion);
apiRoutes.get('/getAllRegion', region.getAllRegion);
apiRoutes.delete('/removeRegion/:id', passport.authenticate('jwt', {session: false}), region.removeRegion);

/////////////////////////SCHOOLS CONTROLLER/////////////////////////
apiRoutes.post('/addPromo', passport.authenticate('jwt', {session: false}), promo.addPromo);
apiRoutes.get('/getAllPromo', promo.getAllPromo);
apiRoutes.delete('/removePromo/:id', passport.authenticate('jwt', {session: false}), promo.removePromo);

/////////////////////////FIELD CONTROLLER/////////////////////////
apiRoutes.post('/addField', passport.authenticate('jwt', {session: false}), field.addField);
apiRoutes.get('/getAllField', field.getAllField);
apiRoutes.delete('/removeField/:id', passport.authenticate('jwt', {session: false}), field.removeField);

/////////////////////////STUDENT CONTROLLER/////////////////////////
apiRoutes.get('/backOffice/infoStudent', student.infoStudent);
apiRoutes.get('/backOffice/infoStudent/:id_profil', passport.authenticate('jwt', {session: false}), student.findStudent);
apiRoutes.get('/backOffice/infoStudent/fromMember/:memberId', passport.authenticate('jwt', {session: false}), student.findStudentByMemberId);
apiRoutes.delete('/backOffice/removeStudent/:id_profil', passport.authenticate('jwt', {session: false}), student.removeStudent);
apiRoutes.delete('/backOffice/removeStudentFromUser/:id_profil', passport.authenticate('jwt', {session: false}), student.removeStudentFromUser);
apiRoutes.delete('/backOffice/removeStudentPhoto/:photo', passport.authenticate('jwt', {session: false}), student.removeStudentPhoto);
apiRoutes.post('/backOffice/addStudent', passport.authenticate('jwt', {session: false}), student.addStudent);
apiRoutes.post('/backOffice/addStudentFromAdmin', passport.authenticate('jwt', {session: false}), student.addStudentFromAdmin);
apiRoutes.put('/backOffice/update/:id', passport.authenticate('jwt', {session: false}), student.updateStudent);

/////////////////////////EMAILS CONTROLLER/////////////////////////
apiRoutes.post('/contact/send', email.contactMail);
apiRoutes.post('/sendmail/pass', email.sendMailForPass);
apiRoutes.get('/createToken/:mail', user.createToken);



app.listen(port.port);
console.log('http://localhost:' + port.port);
