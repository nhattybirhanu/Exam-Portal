import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ExamServiceService } from '../exam-service.service';
import { Exam } from '../model/Exam';
import { User } from '../model/User';

@Component({
  selector: 'app-student-exam-list',
  templateUrl: './student-exam-list.component.html',
  styleUrls: ['./student-exam-list.component.css']
})
export class StudentExamListComponent implements OnInit {
	mybreakpoint: number=0;exams:Exam[]=[];
  constructor(private examService:ExamServiceService,private router :Router,private authService:AuthService) {
	
   }

  ngOnInit(): void {
	this.examService.getExam().subscribe(res=>{
		this.exams=res;
		console.log(this.exams)
	},(console.log))
	this.mybreakpoint = this.getSpan()

  }
  handleSize(event:any) {
	  
	this.mybreakpoint = this.getSpan()
	}
	getSpan():number{
		let size=window.innerWidth-300;

		return size/500
	}

	takeExam(exam:Exam){
		this.examService.setCurrentExam(exam);
		this.router.navigate(['student/examroom'])
		
	}

	canTake(exam:Exam):boolean{
		let now=Date.now();
		let user:User=this.authService.user;
		if(exam.startDate>now||exam.endDate<now) return false;
		const examTaker:any=exam.examtakers.filter((e)=>{
			return e.stuid==user._id;
		})[0];

		return !(examTaker.startTime>0);
	}
	score(exam:Exam):string{
		let user:User=this.authService.user;
		
		const examTaker:any=exam.examtakers.filter((e)=>{
			return e.stuid==user._id;
		})[0];

		return (examTaker.score);
	}
}
