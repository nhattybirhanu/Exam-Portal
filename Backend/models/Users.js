const mongoose = require('mongoose');

const schema = mongoose.Schema({
   fullname: String,
   email: String,
   username:String,
   password: String,
   role: String,
   token:String,
   subject:[{
	title:String,
	code:String,
	prof_fullname:String,
	prof_username:String,
	approved:Boolean,

   }]
});

module.exports = mongoose.model('Users', schema);
