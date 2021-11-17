import { Component, OnInit } from '@angular/core';
import { ExamServiceService } from '../exam-service.service';
import { Exam } from '../model/Exam';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
	displayedColumns:string[]=['index','title','course','action']
	mybreakpoint: number=0;
	exams:Exam[];
  constructor(private examService:ExamServiceService) {


   }

  ngOnInit(): void {
	  this.examService.getProff().subscribe(remoteExams=>{ this.exams=remoteExams
		
			this.examService.setExams(remoteExams)}		,console.log)

	this.mybreakpoint = this.getSpan()
  }
  handleSize(event:any) {
	  
	this.mybreakpoint = this.getSpan()
	}
	getSpan():number{
		let size=window.innerWidth-300;

		return size/500
	}
	
	getTime(time:number)
	{
		var date = new Date(time);
		return date.toLocaleString();
	}
}
