const Exam=require('../models/Exam');
const User=require('../models/Users');
async function getProf(req, res){
	const { name } = req.params;
	const users = await User.find({ role: 'professor' }).select('-password');
	res.json({ success: 1, payload: users });
 };
 async function createExam(req,res){
	 
	 const {title,question,startDate,endDate,weight,prof_username,prof_fullname,subject}=req.body;
	 const students=await User.find({$and:[{role:'student'},{'subject._id':subject._id},{'subject.approved':true}]});
	console.log(students,subject._id)
	 const  examtakers=[];
	 students.forEach((user) => {
		const data={fullname:user.fullname,stuid:user.id,graded:false};
		examtakers.push(data);

	});
	 console.log('body',req.body);
	 const exam =new Exam({
		title:title,
		question:question, 
		startDate:startDate, 
		endDate:endDate, 
		weight:weight,
		prof_username:prof_username,
		prof_fullname:prof_fullname,
		subject:subject,
		examtakers:examtakers

	 });
await exam.save();
	 res.json(exam)
	
 }
 async function pushExamiers(subject_id,id){

	console.log(subjectstudents)
	

 }
async function getProfExam(req,res){
	const {username}=req.params;
	var exams=await Exam.find({'prof_username':username});
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
async function approveStudent(req,res){
	const { actions }=req.body;
	
	actions.forEach ( async (element) => {
	
	const result=await	User.updateOne({_id:element.user_id,'subject.id':element.course_id},{'$set':{'subject.$.approved':element.approve}});
	

	});
	res.sendStatus(200);
}
async function grade(req,res){
	const {exam_id,stuid,score,comment}=req.body;
	console.log(req.body)
	const result=await Exam.updateOne({_id:exam_id,'examtakers.stuid':stuid},{
		$set:{
		'examtakers.$.comment':comment,
		'examtakers.$.score':score,
		'examtakers.$.graded':true,
		
					
	
				}}
				)
	res.json(result);
}


 module.exports={getProf,createExam,addCourse,getProfExam,getStudent,approveStudent,grade}