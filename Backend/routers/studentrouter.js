const router=require('express').Router();
const {courselist,addCourse,removeCourse}=require('../controllers/studentcontroller')
router.get('/allcourse',courselist);
router .post('/addcourse',addCourse);
router .post('/removecourse',removeCourse);

module.exports=router;