const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
   {
      name: { type: String, required: true },
      email: {
         type: String,
         unique: true,
         required: true,
         trim: true,
         lowercase: true,
      },
      password: { type: String, required: true },
      position: { type: String, required: true, trim: true, lowercase: true },
   },
   { timestamps: { createdAt: 'createdAt' } }
);

const examSchema = new mongoose.Schema({
   title: { type: String, required: true },
   question: { type: String, required: true },
   available: { type: Boolean, required: true },
   startDate: { type: Number, required: true },
   endDate: { type: Number, required: true },
   weight: { type: Number, required: true },
   examTakers: {
      type: [
         {
            username: { type: String, required: true },
            fullname: { type: String, required: true },
            email: { type: String, required: true },
            courses: { type: [String], required: true },
         },
      ],
      required: true,
   },
});

const Users = mongoose.model('Users', userSchema);
const Exams = mongoose.model('Exams', examSchema);

module.exports = { Users, Exams };
