const Exams = require('../models/Exam');

async function listAllExams(req, res) {
   const exams = await Exams.find();
   res.json({ success: 1, payload: exams });
}

async function addExam(req, res) {
   const {
      course,
      professor,
      title,
      question,
      available,
      startDate,
      endDate,
      weight,
      examtakers,
   } = req.body;

   try {
      const exam = new Exams({
         course: course,
         professor: professor,
         title: title,
         question: question,
         available: available || false,
         startDate: parseInt(startDate) || Date.now(),
         endDate: parseInt(endDate) || Date.now() + 1000 * 60 * 2,
         weight: weight,
         examtakers: [
            {
               username: examtakers.username,
               fullname: examtakers.fullname,
               startTime: parseInt(examtakers.startTime) || 0,
               endTime: parseInt(examtakers.endTime) || 0,
               graded: parseInt(examtakers.graded) || 0,
               score: parseInt(examtakers.score) || 0,
               answer: examtakers.answer,
            },
         ],
      });
      await exam.save();
      res.send(exam);
   } catch (error) {
      console.log(error);
      res.status(500).send();
   }
}

async function findByQuery(req, res, next) {
   const { course, page, limit } = req.query;

   var options = {
      page: parseInt(page),
      limit: parseInt(limit),
   };

   await Exams.paginate({ course: course }, options)
      .then(result => {
         res.send({
            previous: result.prevPage,
            current: result.page - 1,
            next: result.nextPage,
            limit: result.limit,
            last: result.totalPages,
            totalDocs: result.totalDocs,
            results: result.docs,
         });
      })
      .catch(err => {
         res.status(500).json({ message: e.message });
      });
}

async function deleteAllExams(req, res) {
   await Exams.deleteMany({});
   res.send('All exams Deleted');
}

async function findExamsByCourse(req, res) {
   const { course, page, limit } = req.query;

   var options = {
      page: parseInt(page),
      limit: parseInt(limit),
   };

   await Exams.paginate({ course: course }, options)
      .then(result => {
         res.send({
            previous: result.prevPage,
            current: result.page - 1,
            next: result.nextPage,
            limit: result.limit,
            last: result.totalPages,
            totalDocs: result.totalDocs,
            results: result.docs,
         });
      })
      .catch(err => {
         res.status(500).json({ message: e.message });
      });
}

async function findExamsByProfessor(req, res) {
   const { professor, page, limit } = req.query;

   var options = {
      page: parseInt(page),
      limit: parseInt(limit),
   };

   await Exams.paginate({ professor: professor }, options)
      .then(result => {
         res.send({
            previous: result.prevPage,
            current: result.page - 1,
            next: result.nextPage,
            limit: result.limit,
            last: result.totalPages,
            totalDocs: result.totalDocs,
            results: result.docs,
         });
      })
      .catch(err => {
         res.status(500).json({ message: e.message });
      });
}

async function findExamsByUsername(req, res) {
   const { username, page, limit } = req.query;

   var options = {
      page: parseInt(page),
      limit: parseInt(limit),
   };

   await Exams.paginate({ 'examtakers.username': username }, options)
      .then(result => {
         res.send({
            previous: result.prevPage,
            current: result.page - 1,
            next: result.nextPage,
            limit: result.limit,
            last: result.totalPages,
            totalDocs: result.totalDocs,
            results: result.docs,
         });
      })
      .catch(err => {
         res.status(500).json({ message: e.message });
      });
}

module.exports = {
   listAllExams,
   addExam,
   deleteAllExams,
   findExamsByCourse,
   findExamsByProfessor,
   findExamsByUsername,
};
