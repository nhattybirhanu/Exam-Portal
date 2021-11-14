const mongoose = require('mongoose');

const schema = mongoose.Schema({
   name: String,
   email: String,
   password: String,
   position: String,
});

module.exports = mongoose.model('Users', schema);
