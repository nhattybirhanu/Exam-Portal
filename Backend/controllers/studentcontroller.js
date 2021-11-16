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

module.exports={courselist,addCourse,removeCourse}