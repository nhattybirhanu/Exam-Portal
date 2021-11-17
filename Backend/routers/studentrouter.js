const router=require('express').Router();
const {courselist,addCourse,removeCourse,getExams,postAnswer}=require('../controllers/studentcontroller')
router.get('/allcourse',courselist);
router .post('/addcourse',addCourse);
router .post('/removecourse',removeCourse);
router .get('/exams/:id',getExams);
router.put('/postanswer',postAnswer)

module.exports=router;