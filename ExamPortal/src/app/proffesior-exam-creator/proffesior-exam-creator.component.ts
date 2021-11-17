import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Toolbar , Validators as Val } from 'ngx-editor';
import { filter, first, from, Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ExamServiceService } from '../exam-service.service';
import { Course } from '../model/Course';

@Component({
  selector: 'app-proffesior-exam-creator',
  templateUrl: './proffesior-exam-creator.component.html',
  styleUrls: ['./proffesior-exam-creator.component.css']
})
export class ProffesiorExamCreatorComponent implements OnInit ,OnDestroy{
	examForm:FormGroup;
	creating:boolean=false
	courses:Course[];
	editor:Editor;
	sub:Subscription|unknown;
	html:'';
	que=''
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
  constructor(private formBuilder:FormBuilder,private examService:ExamServiceService,public router:Router,private authService:AuthService) {
	this.examForm=formBuilder.group({
		'title':['exam 1',Validators.required],
		'question':['',Val.required()],
		
		'startDate':['',Validators.required],
		'endDate':['',Validators.required],
		'weight':[100,Validators.required],
		'subject':['',Validators.required]

		
	})
	this.sub=this.examForm.get('question')?.statusChanges.subscribe(data=>{
		this.que=this.examForm.get('question')?.value;
		console.log(this.que)
	})
	this.examForm.get('question')?.enable();

   }
   onSubmit(){
	this.creating=true;
	let id:string=this.examForm.get('subject')?.value;
		
	
	from(this.courses).pipe(filter((cou:Course)=>cou._id===id),first()).subscribe(course=>{

		console.log(this.examForm.value)
		const body=this.examForm.value;
		body.startDate=this.toTimestamp(body.startDate)
		body.endDate=this.toTimestamp(body.endDate)
		body.subject=course;
		console.log(body.subject)
		this.examService.creatExam(this.examForm.value).subscribe(responce=>{
		 this.creating=false;
		 this.router.navigate(['proffesior/proffesior/examlists']);
		},
		error=>{console.log(error)
		 this.creating=false;
		 
	 }
 )
	})
	
   }

  ngOnInit(): void {
	this.courses=this.authService.user.subject;
	this.editor=new Editor();

  }
   toTimestamp(strDate:string){
	var datum = Date.parse(strDate);
	return datum/1000;
 }
 ngOnDestroy(){
	 this.editor.destroy();
 }

}
