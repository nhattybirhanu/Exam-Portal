const bcrypt = require('bcrypt');
const Users=require('../models/Users');
const User = require('../models/Users');

// List all users info
module.exports.listAllUsers = async (req, res) => {
   const users = await User.find();
   res.json({ success: 1, payload: users });
};

// List user by name
module.exports.getUser = async (req, res) => {
   const { name } = req.params;
   const user = await User.find({ name: name });
   res.json({ success: 1, payload: user });
};

// Create new user
module.exports.userSignup = async (req, res) => {
   const { name, email, password, position } = req.body;
   try {
      const hashedPassword = await bcrypt.hash(password, 10); //salt = 10
      const user = new User({
         // _id: ObjectId(email), // Mongoose autogenerates _id
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
	const {email,password}=req.body;
   const user = await Users.findOne({'email':email});
   if (user == null) return res.status(400).send(`User not found`);
   try {
      if (await bcrypt.compare(req.body.password, user.password)) {
         res.json({'error':null,data:user});
      } else {
         res.json({'error':"Wrong password",data:null});
      }
   } catch (error) {
      res.status(500).send();
   }
};

//getUser, userSignup, userLogin, deleteUserById
