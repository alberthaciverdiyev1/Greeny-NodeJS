const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/main');
const bodyParser = require('body-parser')


mongoose.connect('mongodb://127.0.0.1:27017/Greeny', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();
const port = 8080;

app.use(express.static('assets'));

app.use('/',route);

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())





app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
