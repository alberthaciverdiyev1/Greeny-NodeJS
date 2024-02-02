const express = require('express');
const exRoute = express.Router();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
exRoute.use(fileUpload());

exRoute.use(bodyParser.urlencoded({ extended: true }));
exRoute.use(bodyParser.json());
const homeController = require('../controllers/Home/index');
const shopController = require('../controllers/Shop/all');
const productAddController = require('../controllers/Shop/add');
const blogController = require('../controllers/Blogs/all');
const blogAddController = require('../controllers/Blogs/add');
const authController = require('../controllers/Auth/auth');
const contactController = require('../controllers/Contact/index');
const auth = require('../middlewares/AuthMiddleware')
                                                                                // HOME
// Home controller
exRoute.route('/').get(auth.authenticationToken,homeController.indexPage);

                                                                                //SHOP
// Shop controller
exRoute.route('/Shop').get(shopController.index);
exRoute.route('/Shop').post(shopController.index);
exRoute.route('/Shop/add').post(productAddController.add);


                                                                                // BLOG
// Blog controller GET
exRoute.route('/Blogs').get(blogController.indexPage);
exRoute.route('/Blogs/:id/details').get(blogController.Details);
exRoute.route('/addBlog').get(blogAddController.IndexPage);
// Blog controller POST
exRoute.route('/Blogs/add').post(blogAddController.Add);
                                                                                //AUTHORIZATION
// Auth controller GET
exRoute.route('/Register').get(authController.Register);
exRoute.route('/Login').get(authController.LoginIndex);
exRoute.route('/Logout').get(authController.LogOut);
// Auth controller POST
exRoute.route('/RegisterUser').post(authController.RegisterUser);
exRoute.route('/Login').post(authController.Login);
                                                                                //CONTACT
// Contact controller GET
exRoute.route('/Contact').get(contactController.ContactUS);
exRoute.route('/Send-mail').post(contactController.SendMail);


module.exports = exRoute;
