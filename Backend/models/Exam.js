const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
   course: { type: String, required: true },
   professor: { type: String, required: true },
   title: { type: String, default: 'Exam Title' },
   question: { type: String, default: 'Write a question' },
   available: { type: Boolean, default: false },
   startDate: { type: Number, default: 0 },
   endDate: { type: Number, default: 0 },
   weight: { type: Number, default: 0 },
   examtakers: [
      {
         username: { type: String, default: '' },
         fullname: { type: String, default: '' },
         startTime: { type: Number, default: 0 },
         endTime: { type: Number, default: 0 },
         graded: { type: Boolean, default: false },
         score: { type: Number, default: 0 },
         answer: { type: String, default: '' },
      },
   ],
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Exams', schema);
