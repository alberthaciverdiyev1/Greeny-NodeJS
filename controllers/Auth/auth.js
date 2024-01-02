const { Session } = require('express-session');
const user = require('../../Models/Auth');

const Register = (req, res) => {
  res.render('Auth/register', { css: 'user-auth.css' });
};

const LoginIndex = (req, res) => {
  res.render('Auth/login', { css: 'user-auth.css' });
};

const RegisterUser = (req, res) => {
  user.create(req.body);
  res.sendStatus(200);
};
const Login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const foundUser = user.findOne({ email: email });
  // const foundUser = await user.findOne({ email: email });

  console.log(email);
  console.log(foundUser);

  if (foundUser) {
    if (foundUser.password === password) {
      res.json({ status: 200, message: 'Logged in' });
    } else {
      res.json({ status: 404, message: 'Wrong password' });
    }
  } else {
    res.json({ status: 404, message: 'User not found' });
  }

};
const LogOut = (req, res) => {
  req.Session.destroy();
  res.redirect('/');
};
module.exports = {
  Register, LoginIndex, RegisterUser, Login, LogOut
};