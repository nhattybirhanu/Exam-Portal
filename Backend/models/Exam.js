const mongoose = require('mongoose');

const schema = mongoose.Schema({
   name: String,
   email: String,
   password: String,
   role: String,
   token: String,
});

module.exports = mongoose.model('Exams', schema);
