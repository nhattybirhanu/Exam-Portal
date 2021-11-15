const mongoose = require('mongoose');

const schema = mongoose.Schema({
   fullname: String,
   email: String,
   username: String,
   password: String,
   role: String,
   token: String,
});

module.exports = mongoose.model('Users', schema);
