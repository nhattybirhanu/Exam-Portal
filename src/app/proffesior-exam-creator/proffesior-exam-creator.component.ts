import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ExamServiceService } from '../exam-service.service';
import { Course } from '../model/Course';

@Component({
  selector: 'app-proffesior-exam-creator',
  templateUrl: './proffesior-exam-creator.component.html',
  styleUrls: ['./proffesior-exam-creator.component.css']
})
export class ProffesiorExamCreatorComponent implements OnInit {
	examForm:FormGroup;
	creating:boolean=false
	courses:Course[];
  constructor(private formBuilder:FormBuilder,private examService:ExamServiceService,public router:Router,authService:AuthService) {
	  this.courses=authService.user.subject;
	this.examForm=formBuilder.group({
		'title':['exam 1',Validators.required],
		'question':['question 1',Validators.required],
		'available':[true,Validators.required],
		'startDate':['',Validators.required],
		'endDate':['',Validators.required],
		'weight':[100,Validators.required],
		'subject':['',Validators.required]

		
	})

   }
   onSubmit(){
	   this.creating=true;
	   console.log(this.examForm.value)
	   const body=this.examForm.value;
	   body.startDate=this.toTimestamp(body.startDate)
	   body.endDate=this.toTimestamp(body.endDate)

	   this.examService.creatExam(this.examForm.value).subscribe(responce=>{
		this.creating=false;
		this.router.navigate(['proffesior/proffesior/examlists']);
	   },
	   error=>{console.log(error)
		this.creating=false;
		
	}
	   )
   }

  ngOnInit(): void {
  }
   toTimestamp(strDate:string){
	var datum = Date.parse(strDate);
	return datum/1000;
 }

}
