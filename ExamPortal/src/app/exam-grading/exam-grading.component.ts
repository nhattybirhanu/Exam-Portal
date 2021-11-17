import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamServiceService } from '../exam-service.service';
import { Exam } from '../model/Exam';
import { ExamTakers } from '../model/ExamTakers';

@Component({
  selector: 'app-exam-grading',
  templateUrl: './exam-grading.component.html',
  styleUrls: ['./exam-grading.component.css']
})
export class ExamGradingComponent implements OnInit {
	exam:Exam;
	examTaker:ExamTakers;
	gradeForm:FormGroup;
	exam_id='-1'
	stuid='-1'

	constructor(routing:ActivatedRoute,private examService:ExamServiceService,builder:FormBuilder,private router:Router) {
	  this.gradeForm=builder.group({
		'score':['',[ Validators.required]],
		'comment':['']
	  });
  
  
	routing.queryParams.subscribe(p=>{
		 this.exam_id=p['exam_id'];
			this.stuid=p['stu'];
	
		this.exam=examService.myExamList.filter((exam)=>{
			return this.exam_id==exam._id;
		})[0];
		this.examTaker=this.exam.examtakers.filter((taker)=>{
			return taker.stuid==this.stuid;

		})[0]
	//	this.examTaker=this.exam.examTaker;
		console.log(this.examTaker)
	}
	);

	


   }

  ngOnInit(): void {
  }
  onSubmit(){
	const grade=
	this.gradeForm.value;
	grade.exam_id=this.exam_id;
	grade.stuid=this.stuid;
	this.examService.postGrade(grade).subscribe(res=>{
	console.log(res);
		this.router.navigate(['professor/examlists/detail'], { queryParams:{'id':this.exam._id}})

	})
  }

}
