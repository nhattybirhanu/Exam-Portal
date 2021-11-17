import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { LoginResponse } from './model/LoginResponce';
import { User } from './model/User';
import {CookieService} from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
	user:User|any;
  constructor(private http:HttpClient,private cookieService:CookieService) { 
	if(cookieService.check('user')){
		this.user=JSON.parse(cookieService.get('user'))
	}
  }
  setUser(user?:User|null){
	  this.user=user;
	  if(this.user)
	  this.cookieService.set('user',JSON.stringify(this.user))
 
	}

  		login(email:string,password:string):Observable<LoginResponse>{

		return	this.http.post<LoginResponse>('http://localhost:3000/api/users/login',{email,password})
	  }
	  signUp(body:any):Observable<LoginResponse>
	  {
		return	this.http.post<LoginResponse>('http://localhost:3000/api/users/signup',body)

	  }
	  checkavailability(filed:string,value:string){
		  return this.http.get('http://localhost:3000/api/users/availability/'+filed+'/'+value)
	  }
	  addCourse(body:any):Observable<boolean>{
		  //if(this.user)
		  {

			body.prof_id=this.user._id
			return this.http.post<boolean>('http://localhost:3000/api/professor/addcourse',body)
			  }
			  ;
	}
	logout(){
		this.cookieService.delete('user')
		this.setUser(null);
	}

	updateCourse(course:any,add:boolean):Observable<boolean>{
		course.stduent_id=this.user._id;
		return this.http.post<boolean>('http://localhost:3000/api/student/'+(add?'addcourse':'removecourse'),course);
	}
	getStudent():Observable<User[]>{
			let params:{'prof_username':string}={
				prof_username:this.user.username

			};

		return this.http.get<User[]>('http://localhost:3000/api/professor/students',{params});

	}
	updateApprovalForUser(actions:any):Observable<any>{
		
		return this.http.put<any>('http://localhost:3000/api/professor/approve',{actions});	
	}

	ngOnInit(): void {
	
	}
	


}
