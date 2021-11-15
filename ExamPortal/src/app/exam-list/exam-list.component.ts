import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {
	mybreakpoint: number=0;
  constructor() { }

  ngOnInit(): void {
	this.mybreakpoint = this.getSpan()
  }
  handleSize(event:any) {
	  
	this.mybreakpoint = this.getSpan()
	}
	getSpan():number{
		let size=window.innerWidth-300;

		return size/500
	}
}
