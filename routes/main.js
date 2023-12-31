const express = require('express');
const router = express.Router();
const user = require('../Models/Auth');
const addBlog = require('../Models/Blogs');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.render('home/index');
});

router.get('/Shop', (req, res) => {
  res.render('Shop/index');
});

router.get('/Login', (req, res) => {
  res.render('Auth/login', { css: 'user-auth.css' });

});

router.get('/Register', (req, res) => {
  res.render('Auth/register', { css: 'user-auth.css' });
});

router.get('/Contact', (req, res) => {
  res.render('Auth/contact-us', { css: 'contact.css' });
});

router.post('/registerUser', (req, res) => {
  user.create(req.body);
  res.sendStatus(200);
});
router.get('/Blogs',(req,res)=>{
  res.render('Blogs/index')
});

router.post('/Blogs/add', (req, res) => {
  addBlog.create(req.body);
  res.redirect('Blogs/index');
});
router.get('/addBlog', (req, res) => {
  res.render('Blogs/Add', { css: 'user-auth.css' });
})

module.exports = router;
