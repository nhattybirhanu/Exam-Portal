import { Component, OnInit } from '@angular/core';
import { flatMap, map, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { ExamServiceService } from '../exam-service.service';
import { Course } from '../model/Course';
import { User } from '../model/User';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {
	displayedColumns: string[] = [ 'title', 'code', 'profname','action','approve'];
	dataSource:User[]=[];
	enroled:Course[]=[]
	updating:boolean=false;

  constructor(private examService:ExamServiceService,private authServie:AuthService) {

   }

  ngOnInit(): void {
	  this.enroled=this.authServie.user.subject;
	this.examService.getCourse().subscribe(course=>{
	const flatCourse=	course.map((item:User)=>{
		return	item.subject.flatMap((sub:Course)=>{
			var user:User=item;
			sub.enrolled=this.studentEnrolled(sub._id);
			user.course=sub;
			let newUser=new User();
			return Object.assign(newUser,user);
		})
		});
		this.dataSource=flatCourse.flat(1);
	})
  }
   studentEnrolled(id:string):boolean{

	return this.enroled.some((ele)=>ele._id===id);
   }
  enrole(courseByProf:User){
	  this.updating=true;
	  let add:boolean|unknown=(courseByProf.course as Course).enrolled
	  let updateingCourse:Course=(courseByProf.course as Course)
		updateingCourse.proffesiorName=courseByProf.fullname;
		updateingCourse.proffesiorUserName=courseByProf.username;
		console.log(updateingCourse);

	  this.authServie.updateCourse(updateingCourse,!add).subscribe(res=>{
		  if(res){
			  let updated=courseByProf;
			  let course:Course= (updated.course as Course);
				course.enrolled=!add;
			 let index= this.enroled.findIndex((c=>c._id===course._id));
			 this.enroled[index]=course;
			 let user:User=this.authServie.user;
			 user.subject=this.enroled;
			 this.authServie.setUser(user);
		  }
		this.updating=false;


	  },(err)=>{
		this.updating=false;

	  })
	 
  }

}
