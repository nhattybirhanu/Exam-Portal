const mongoose = require('mongoose');

const schema = mongoose.Schema({
	
	title:String,
	question:String,
	available:Boolean,
	startDate:Number,
	endDate:Number,
	weight:Number,
	prof_username:String,
	prof_fullname:String,
	subject:{
		'title':String,
		'code':String
	},
	examtakers:[{
		stuid:String,
		fullname:String,
		startTime:Number,
		endTime:Number,
		graded:Boolean,
		score:Number,
		answer:String,
		comment:String,
	}]
});

module.exports = mongoose.model('Exams', schema);
