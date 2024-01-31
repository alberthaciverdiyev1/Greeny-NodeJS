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

module.exports = RegisterUser;

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    req.session = {};

    if (foundUser) {
      const hashedPassword = await bcrypt.compare(password, foundUser.password);

      if (hashedPassword) {
        // const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, {
        //   expiresIn: '1h',
        // });

        const token = jwt.sign({ userId: foundUser._id }, 'my-secret-key-is-2001', {
          expiresIn: '1h',
        });

        req.session.user = {
          userId: foundUser._id,
          email: foundUser.email,
          name: foundUser.name,
          surname: foundUser.surname,
          gender: foundUser.gender,
        };

        res.locals.user = req.session.user || null;

      } else {
        res.status(404).json({ message: 'Wrong password' });
      }
    } else {
      res.locals.user = null;
      res.status(404).json({ message: 'Wrong email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const LogOut = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
module.exports = {
  Register, LoginIndex, RegisterUser, Login, LogOut
};