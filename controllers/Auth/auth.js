const { Session } = require('express-session');
const jwt = require('jsonwebtoken');
const User = require('../../Models/Auth');
const bcrypt = require('bcrypt');



const Register = (req, res) => {
  res.render('Auth/register', { css: 'user-auth.css' });
};

const LoginIndex = (req, res) => {
  res.render('Auth/login', { css: 'user-auth.css' });
};


const RegisterUser = async (req, res) => {
  try {
    const { name, surname, email, age, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, surname, email, age, password: hashedPassword });
    await newUser.save();
    res.status(201).json('User created successfully');
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    // return res.status(200).json({ foundUser: foundUser })
    req.session = {};

    if (foundUser) {
      bcrypt.compare(password, foundUser.password, (err, isPasswordValid) => {
        if (err || !isPasswordValid) {
          return res.status(401).json({ error: err, isPasswordValid: isPasswordValid });
        }
        const token = jwt.sign({ userId: foundUser._id }, 'my-secret-key-is-2001', {
          expiresIn: '1d',
        });
        // const token = jwt.sign({ userId: foundUser._id},'my-secret-key-is-2001');
        res.cookie('jsonwebtoken', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24
        })
        
        res.status(200).json({ status: 200, message: 'Succesfully enteed.', token });
      });
    } else {
      res.locals.user = null;
      res.status(404).json({ message: 'Wrong email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const LogOut = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
module.exports = {
  Register, LoginIndex, RegisterUser, Login, LogOut
};