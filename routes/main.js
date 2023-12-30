const express = require('express');
const router = express.Router();
const user = require('../Models/Auth');
const path = require('path');

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

  
  router.post('/register-user', (req, res) => {
    // user.create(req.body);
    console.log(req.body);
    // res.redirect('/');
  })
  
  module.exports = router;