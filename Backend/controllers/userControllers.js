const bcrypt = require('bcrypt');
const Users = require('../models/Users');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const config = process.env;

const tokenKey = config.TOKEN_KEY;
// List all users info
async function listAllUsers(req, res) {
   const users = await User.find();
   res.json({ success: 1, payload: users });
}

// List user by name
async function getUser(req, res) {
   const { name } = req.params;
   const user = await User.find({ name: name });
   res.json({ success: 1, payload: user });
}

// Create new user
async function userSignup(req, res) {
   const { name, username, email, password, role } = req.body;
   console.log(req.body);
   try {
      const hashedPassword = await bcrypt.hash(password, 10); //salt = 10
      const user = new User({
         name: name,
         username: username,
         email: email,
         password: hashedPassword,
         role: role,
      });
      await user.save();
      //   users.push(user); //replace with database addUser
      let token = generateToken(user.username);
      user.password = null;
      user.token = token;
      res.status(201).json({ error: null, data: user });
   } catch (error) {
      res.status(500).send();
   }
}

// User Login
async function userLogin(req, res) {
   const { email, password } = req.body;
   const user = await Users.findOne({ email: email });
   if (user == null) return res.status(400).send(`User not found`);
   try {
      if (await bcrypt.compare(password, user.password)) {
         let token = generateToken(user.username);
         user.password = null;
         user.token = token;
         console.log(token);
         return res.json({ error: null, data: user });
      } else {
         return res.json({ error: 'Wrong password', data: null });
      }
   } catch (error) {
      console.log(error);
      return res.status(500).send();
   }
}

function generateToken(username) {
   const token = jwt.sign({ username }, tokenKey, {
      expiresIn: '10m',
   });
   return token;
}

//getUser, userSignup, userLogin, deleteUserById
async function checkFiledAvailale(req, res) {
   console.log('params ', req.params);
   const { filed, value } = req.params;
   const user = await Users.findOne(
      filed === 'username' ? { username: value } : { email: value }
   ).select(['username']);
   return res.send(user === null);
}

async function deleteUserById(req, res) {
   // console.log(req.body.id);
   // await Users.findByIdAndDelete({ _id: req.body.id });
   await Users.remove({});
   res.send(req.body);
}

module.exports = {
   userLogin,
   userSignup,
   listAllUsers,
   getUser,
   checkFiledAvailale,
   deleteUserById,
};
