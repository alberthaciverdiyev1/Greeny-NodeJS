const express = require('express');
const router = express.Router();
const user = require('../Models/Auth');
const Blog = require('../Models/Blogs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
router.use(fileUpload());

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

router.get('/Blogs', (req, res) => {
  Blog.find({})
    .then((blogs) => {
      blogs.forEach(blog => {
        const date = new Date(blog.createdAt);
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = date.toLocaleString('en-US', options).toUpperCase();
        blog.date = formattedDate;
      });
      res.render('Blogs/index', { blogs: blogs });
    })
});

router.post('/Blogs/add', (req, res) => {
  const image = req.files.image;
  image.mv('./assets/images/uploads/' + image.name);
  Blog.create({
    title: req.body.title,
    context: req.body.context,
    imageURL: image.name
  });
  res.redirect('/Blogs');
});

router.get('/Blogs/:id/details', (req, res) => {
  Blog.findById(req.params.id)
  .then((x) => {
    const date = new Date(x.createdAt);
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = date.toLocaleString('en-US', options).toUpperCase();
    x.date = formattedDate;
      res.render('Blogs/details', { css:'blog-details', details: x });
    })
});


router.get('/addBlog', (req, res) => {
  res.render('Blogs/Add', { css: 'user-auth.css' });
});

module.exports = router;
