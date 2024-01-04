const { Session } = require('express-session');
const user = require('../../Models/Auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Register = (req, res) => {
  res.render('Auth/register', { css: 'user-auth.css' });
};

const LoginIndex = (req, res) => {
  res.render('Auth/login', { css: 'user-auth.css' });
};

const RegisterUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedpassword = bcrypt.hash(password, 10);
    const user = new User(username, hashedpassword);
    await user.save();
    res.status(201).json('User created successfully');
  } catch (err) {
    res.status(400).json(err);
  }

};
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
    const foundUser = await user.findOne({ email: email });
    if (foundUser) {
      const hashedpassword = await bcrypt.compare(password, foundUser.password);
      if (hashedpassword) {

        const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
          expiresIn: '1h',
        });
        res.status(200).json({ token });
      }else{
        res.status(404).json({ message: 'Wrong password' });
      }
    }
  } catch (error) {
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