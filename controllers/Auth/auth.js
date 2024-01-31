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
    const { name, surname,email, age, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, surname,email, age, password: hashedPassword });
    await newUser.save();
    res.status(201).json('User created successfully');
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = RegisterUser;

// const Login = async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   const foundUser = await user.findOne({ email: email });
//   // const foundUser = await user.findOne({ email: email });

//   console.log(email);
//   console.log(foundUser);

//   if (foundUser) {
//     if (foundUser.password === password) {
//       res.json({ status: 200, message: 'Logged in' });
//     } else {
//       res.json({ status: 404, message: 'Wrong password' });
//     }
//   } else {
//     res.json({ status: 404, message: 'User not found' });
//   }

// };

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      const hashedpassword = await bcrypt.compare(password, foundUser.password);
      if (hashedpassword) {

        const token = jwt.sign({ userId: User._id }, 'your-secret-key', {
          expiresIn: '1h',
        });
        res.status(200).json({ token });
      } else {
        res.status(404).json({ message: 'Wrong password' });
      }
    }else{
      res.status(404).json({ message: 'Wrong password 0r Email' });
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error });
  }
};
const LogOut = (req, res) => {
  req.Session.destroy();
  res.redirect('/');
};
module.exports = {
  Register, LoginIndex, RegisterUser, Login, LogOut
};