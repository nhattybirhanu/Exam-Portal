const express = require('express');
const {getProf,createExam,addCourse,getProfExam,getStudent,approveStudent} = require('../controllers/proffesiorcontroller');
const router = express.Router();
 router.get('/',getProf);
 router.get('/exams/:username',getProfExam);

 router.post('/createexam',createExam);
 router.post('/addcourse',addCourse);
 router.get('/students',getStudent)
 router.put('/approve',approveStudent);
 

 module.exports=router;