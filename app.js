const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const route = require('./controllers/main');
const sendMail = require('./controllers/send');
// const auth = require('./controllers/Auth/add');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


mongoose.connect('mongodb://127.0.0.1:27017/Greeny', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
const port = 8080;

app.use(express.static('assets'));

app.use('/', route);
app.use('/', sendMail);
// app.use('/',auth);
app.use(fileUpload());
app.use(expressSession({
  secret: "process.env.SESSION_SECRET",
  resave: false,
  saveUninitialized: true,
}))
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())





app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
