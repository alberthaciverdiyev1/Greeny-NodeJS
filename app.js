const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary').v2
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
  //CUSTOM
const routes = require('./routes/main');
const sendMail = require('./controllers/send');
const { checkUser } = require('./middlewares/AuthMiddleware');
const fs = require('fs');

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_KEY,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


mongoose.connect('mongodb://127.0.0.1:27017/Greeny', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = 8080;
const app = express();
app.use(cookieParser())
app.use(express.static('assets'));
app.get('*', checkUser)
app.use('/', routes);
app.use('/', sendMail);
// app.use(fileUpload({useTempFiles: true}));

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
app.use(express.json());
// app.use(expressSession({
//   secret: "process.env.SESSION_SECRET",
//   resave: false,
//   saveUninitialized: true,
// }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
