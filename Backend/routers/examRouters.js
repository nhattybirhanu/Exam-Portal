const express = require('express');
const {
   listAllExams,
   addExam,
   deleteAllExams,
   findExamsByCourse,
   findExamsByProfessor,
   findExamsByUsername,
} = require('../controllers/examControllers');
const router = express.Router();

router.get('/list', listAllExams);
router.get('/findbycourse/', findExamsByCourse);
router.get('/findbyprofessor/', findExamsByProfessor);
router.get('/findbyusername/', findExamsByUsername);
router.post('/add', addExam);
router.delete('/deleteall', deleteAllExams);

module.exports = router;
