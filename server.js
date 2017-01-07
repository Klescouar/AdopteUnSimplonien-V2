const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const jwt = require('jwt-simple');
const mongojs = require('mongojs');
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
const apiRoutes = express.Router();
const db = mongojs('mongodb://Poncho:simplonien@ds127928.mlab.com:27928/adopte-un-simplonien', ['simplonien', 'users']);

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

app.get('/api/infoStudent', (req, res) => {
    console.log('I received a GET request');
    db.simplonien.find(function(err, docs) {
        res.json(docs);
    });
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
apiRoutes.get('/users', user.RecruiterUsers);
apiRoutes.get('/memberinfo', user.memberinfo);
apiRoutes.delete('/memberinfo/delete/:id', passport.authenticate('jwt', {session: false}), user.remove);

/////////////////////////STUDENT CONTROLLER/////////////////////////
apiRoutes.get('/backOffice/infoStudent', passport.authenticate('jwt', {session: false}), student.infoStudent);
apiRoutes.get('/backOffice/infoStudent/:id_profil', student.findStudent);
apiRoutes.get('/backOffice/infoStudent/fromMember/:memberId', student.findStudentByMemberId);
apiRoutes.delete('/backOffice/removeStudent/:id_profil', passport.authenticate('jwt', {session: false}), student.removeStudent);
apiRoutes.post('/backOffice/addStudent', passport.authenticate('jwt', {session: false}), student.addStudent);
apiRoutes.put('/backOffice/update/:id', passport.authenticate('jwt', {session: false}), student.updateStudent);

app.listen(port.port);
console.log('http://localhost:' + port.port);
