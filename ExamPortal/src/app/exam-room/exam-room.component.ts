import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Toolbar, Validators as Val } from 'ngx-editor';
import { AuthService } from '../auth.service';
import { ExamServiceService } from '../exam-service.service';
import { Exam } from '../model/Exam';

@Component({
  selector: 'app-exam-room',
  templateUrl: './exam-room.component.html',
  styleUrls: ['./exam-room.component.css']
})
export class ExamRoomComponent implements OnInit ,OnDestroy{
	exam:Exam;
	editor:Editor;
	creating:boolean=false;
	roomform:FormGroup;
	start_time:Number=0;
	end_time:Number=0;

	toolbar: Toolbar = [
		['bold', 'italic'],
		['underline', 'strike'],
		['code', 'blockquote'],
		['ordered_list', 'bullet_list'],
		[{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
		['link', 'image'],
		['text_color', 'background_color'],
		['align_left', 'align_center', 'align_right', 'align_justify'],
	  ];
  constructor(private examService:ExamServiceService,private formBuilder:FormBuilder,private router:Router,private authservice:AuthService) {
	this.roomform=formBuilder.group({
		'answer':['',Val.required()],

	})


	this.exam=examService.currentExam;
	this.start_time=Date.now();
	console.log("exam",this.start_time,examService.currentExam)

   }

  ngOnInit(): void {
	this.editor=new Editor();

  }
  ngOnDestroy(): void {
	  //Called once, before the instance is destroyed.
	  //Add 'implements OnDestroy' to the class.
	 this.editor.destroy();
	  
  }
  onSubmit(){
	this.end_time=Date.now();
	const answer:any={};
	answer.answer=this.roomform.get('answer')?.value;
	answer.startTime=this.start_time;
	answer.endTime=this.end_time;
	answer.exam_id=this.exam._id;
	answer.user_id=this.authservice.user._id;
	console.log(answer)
	this.examService.postAnswer(answer).subscribe(res=>
		{this.creating=false;
		this.router.navigate(['student/exams'])}
		,(err)=>{

		});
	
  }

}
