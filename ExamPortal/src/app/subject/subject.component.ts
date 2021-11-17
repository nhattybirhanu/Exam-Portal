import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Course } from '../model/Course';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
	panelOpenState = false;
	myform:FormGroup;
	subject:Course[];
  constructor(formBuilder:FormBuilder,private authService:AuthService) { 
	  this.subject=authService.user.subject;
this.myform=formBuilder.group({
	'title':['',Validators.required],
	'code':['',Validators.required]

})

  }

  ngOnInit(): void {
  }
  onSubmit(){
	  if(this.authService.user){
		let course=this.myform.value;
	this.authService.addCourse(course).subscribe(res=>{
		if(res){
			this.subject.push({'title':course.title,'code':course.code,'proffesiorName':'',proffesiorUserName:'','_id':''});
			this.myform.reset();
		}
		console.log("Add course ",res);
	},error=>{
		console.log("Add course error",error);

	});}
	 else 
	console.log("Add course user error",this.authService.user);

  }

}
