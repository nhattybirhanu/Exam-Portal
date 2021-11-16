const Exam=require('../models/Exam');
const User=require('../models/Users');
async function getProf(req, res){
	const { name } = req.params;
	const users = await User.find({ role: 'professor' }).select('-password');
	res.json({ success: 1, payload: users });
 };
 async function createExam(req,res){
	 const {title,question,startDate,endDate,weight,prof_username,prof_fullname,subject}=req.body;
	 console.log('body',req.body);
	 const exam =new Exam({
		title:title,
		question:question, 
		startTime:startDate, 
		endTime:endDate, 
		weight:weight,
		prof_username:prof_username,
		prof_fullname:prof_fullname,
		subject:subject

	 });
 await exam.save();
	 res.json(exam)
 }
async function getProfExam(req,res){
	const {username}=req.params;
	var exams=await Exam.find({'prof_username':username}).select('-examtakers');
	res.json(exams);

}
async function addCourse(req,res){
	const {prof_id,title,code} =req.body;
	const callback=await User.updateOne({_id:prof_id},{$addToSet:{subject:{title:title,code:code}}})
	let success=callback.acknowledged&&callback.modifiedCount>0;

	res.status(success?200:201).send(success)

}
async function getStudent(req,res){
	const {prof_username,course_id,approve}=req.query;

	const students=await User.find({role:'student','subject.prof_username':prof_username})
	res.json(students);
}


 module.exports={getProf,createExam,addCourse,getProfExam,getStudent}