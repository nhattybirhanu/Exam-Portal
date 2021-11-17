import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamServiceService } from '../exam-service.service';
import { Exam } from '../model/Exam';
import { ExamTakers } from '../model/ExamTakers';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {
	exam:Exam;
	examtakers:ExamTakers[]=[];
	displayedColumns:string[]=['index','title','start_time','end_time','status','action']

  constructor(private examService:ExamServiceService,activedRoute:ActivatedRoute) {
	activedRoute.queryParams.subscribe(e=>{
		console.log(e['id']);

		this.exam=examService.myExamList.filter((exam)=>{
			return e['id']==exam._id;
		})[0];
		this.examtakers=this.exam.examtakers;
		console.log(this.examtakers)
		//this.exam=e;
		//this.examtakers=this.exam.examtakers;
	})

   }

  ngOnInit(): void {
  }
  getTime(time:number)
{
	var date = new Date(time);
	return date.toLocaleString();
}
}
