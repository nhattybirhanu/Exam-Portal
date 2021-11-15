const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Exam = require('../models/Users');
require('dotenv').config();

// List all users info
module.exports.listAllUsers = async (req, res) => {
   const users = await User.find();
   res.json({ success: 1, payload: users });
};

// List user by name
module.exports.getUser = async (req, res) => {
   let email = req.params.email;
   const user = await User.find({ email: email });
   // .find( {"name_lower": { $regex: new RegExp("^" + thename.toLowerCase(), "i") } });
   res.json({ success: 1, payload: user });
};

// Create new user
module.exports.userSignup = async (req, res) => {
   const { name, email, password, position } = req.body;
   try {
      const hashedPassword = await bcrypt.hash(password, 10); //salt = 10
      const user = new User({
         name: name,
         email: email,
         password: hashedPassword,
         position: position,
      });
      await user.save();
      //   users.push(user); //replace with database addUser
      res.status(201).send();
   } catch (error) {
      res.status(500).send();
   }
};

// User Login
module.exports.userLogin = async (req, res) => {
   const { email, password } = req.body;
   let userAuthenticated = false;
   const user = await User.findOne({ email: email }); //{ email: req.params.email });
   // console.log(user); //delete line
   if (user == null) return res.status(404).send('User not found');
   else {
      userAuthenticated = true;
   }
   try {
      // User is authenticated
      if (await bcrypt.compare(password, user.password)) {
         const accessToken = jwt.sign(
            { username: user.email },
            process.env.PRIVATE_KEY
         );
         console.log(accessToken);
         res.status(200).send({ token: accessToken });
      }
   } catch (err) {
      res.status(500).send('bcrypt.compare() error');
   }
};

module.exports.postExam = async (req, res) => {
   const exam = req.body;
   res.send(exam);
};

function authenticateToken(req, res, next) {
   const authHearder = req.headers['authorization'];
   const token = authHearder && authHearder.split(' ')[1];
   if (token == null) {
      return res.sendStatus(401);
   }

   jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
      if (err) return res.SendStatus(403);
      req.user = user;
      next();
   });
}

//
