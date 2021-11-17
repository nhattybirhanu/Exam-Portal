const Exam=require('../models/Exam');
const User=require('../models/Users');

async function courselist(req,res){
	const course=await User.find({role:'professor'}).exists('subject').select(['subject','fullname','username']);
	res.send(course);
}

async function addCourse(req,res){
	const {stduent_id,_id,title,code,proffesiorName,proffesiorUserName} =req.body;
	const callback=await User.updateOne({_id:stduent_id},{
		$addToSet:{subject:{_id:_id,title:title,code:code,prof_fullname:proffesiorName,prof_username:proffesiorUserName
	}}})
	let success=callback.acknowledged&&callback.modifiedCount>0;
	res.status(success?200:201).send(success)

}
async function removeCourse(req,res){
	const {stduent_id,_id,title,code,proffesiorName,proffesiorUserName} =req.body;

	const callback=await User.updateOne({_id:stduent_id},{$pull:{subject:{

		_id:_id,title:title,code:code,prof_fullname:proffesiorName,prof_username:proffesiorUserName
	}}})
	let success=callback.acknowledged&&callback.modifiedCount>0;
	res.status(success?200:201).send(success)

}
async function getExams(req,res){
	const {id}=req.params;
	console.log(id);
	const exams=await Exam.find({'examtakers.stuid':id});
	res.json(exams);
}
async function postAnswer(req,res){
	const {startTime,endTime,answer,user_id,exam_id,fullname}=req.body;
	const result=await Exam.updateOne({_id:exam_id,'examtakers.stuid':user_id},{$set:{
		'examtakers.$':{
			fullname,
			startTime,
			endTime,
			answer,
			stuid:user_id
		}
	}})
	res.json(result)
}

module.exports={courselist,addCourse,removeCourse,getExams,postAnswer}