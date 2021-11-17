import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { catchError, map, merge, Observable, of, startWith, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { Course } from '../model/Course';
import { User } from '../model/User';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements AfterViewInit {

	displayedColumns: string[] = ['name', 'email', 'course' ,'status'];
	filter:User[]=[];
	students:User[]=[];
	courses:Course[]=[];
	 filter_by_course:string|any=null;
	 filter_by_status:boolean|any=null;
		actions:{approve:boolean,course_id:string,user_id:string}[]=[];
		btntext:string="Approve students"
  
		updating:boolean=false;
	constructor(private _httpClient: HttpClient,private userService:AuthService) {
		this.courses=userService.user.subject;
	}
  
	ngAfterViewInit() {
  this.loadtable();

	}
	loadtable(){
		const prof:User=this.userService.user;
		this.userService.getStudent().subscribe(students=>{
			const flatusers=	students.map((item:User)=>{
				return	item.subject.flatMap((sub:Course)=>{
					var user:User=item;
				//	sub.enrolled=this.studentEnrolled(sub._id);
					user.course=sub;
					let newUser=new User();
					return Object.assign(newUser,user);
				}).filter((c)=>{
					let fcourse:Course|any=(c.course as Course)
					console.log(fcourse.approved)
					return fcourse.prof_username===prof.username
				})
				});

			this.students=flatusers.flat(1);
			this.filter=this.students;
			console.log(students)
		})
	}
	onCourseFilter(event:any){
		if(event.value==='-1')
		{
			
			this.filter_by_course=null;
		}
		else this.filter_by_course=event.value;
		this.filterTable();

	}
	onStatusFilter(event:any){
		if(event.value==='-1') 
		{
			this.displayedColumns=this.displayedColumns.filter(c=>c!='select')
		this.filter_by_status=null;

		}
		else 
		{
			//this.displayedColumns
			if(!this.displayedColumns.includes('select'))
			this.displayedColumns.unshift('select')
			this.filter_by_status=(event.value =='true');
			this.btntext=!this.filter_by_status?"Approve students":"Change to pending students"

		}

		this.filterTable();
	}

	filterTable(){
		this.filter=this.students.filter((stu)=>{
			
			let fflag=true;
			let course:Course=stu.course as Course;

			if(this.filter_by_course==null&&this.filter_by_status==null)
			 return true;
			 if(this.filter_by_course!=null&&this.filter_by_status!=null){
				 return course._id===this.filter_by_course&&(course.approved?course.approved:false)===this.filter_by_status;
			 }

			 if(this.filter_by_course!=null){
				return course._id===this.filter_by_course;
				}
				if(this.filter_by_status!=null){

					return (course.approved?course.approved:false)==this.filter_by_status;
					}
			 return fflag;
		})
		this.actions=[];
	}
	selectAll(event:any){
		this.actions=[];
		let selected:boolean=event.checked
		this.filter=this.filter.map(user=>{
			let course:Course=user.course as Course;
			course.select=selected;
			user.course=course;
			let newUser=new User();
			if(selected){
				this.actions.push({approve:!this.filter_by_status,course_id:course._id,user_id:user._id})
			}
			return Object.assign(newUser,user);
		})
	
		console.log(this.actions)
	}
	singleSelect(event:any,user:User){
		let selected:boolean=event.checked;
		let course:Course=user.course as Course;
		if(selected){

			this.actions.push({approve:!this.filter_by_status,course_id:course._id,user_id:user._id})

		} else {
			this.actions=this.actions.filter(ac=>ac.course_id!=course._id);
		}
		//console.log(this.actions)

	}
	updateAll(){
		this.updating=true;
		console.log(this.actions)
		this.userService.updateApprovalForUser(this.actions).subscribe(res=>{
			setTimeout(()=>this.updateLocaly(),3000);
		},()=>{

			setTimeout(()=>this.updateLocaly(),3000);
		});
	}
	updateLocaly(){
		this.updating=false;
		this.loadtable();
	}
	

  }
  

