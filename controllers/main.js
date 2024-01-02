const express = require('express');
const router = express.Router();
const user = require('../Models/Auth');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

module.exports = router;
