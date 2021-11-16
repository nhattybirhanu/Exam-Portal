const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema(
   {
      name: { type: String, required: true },
      username: { type: String, required: true, unique: true },
      email: {
         type: String,
         unique: true,
         required: true,
         trim: true,
         lowercase: true,
      },
      password: { type: String, required: true },
      role: { type: String, required: true, trim: true, lowercase: true },
   },
   { timestamps: { createdAt: 'createdAt' } }
);

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Users', schema);
