import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './model/LoginResponce';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	user:User|any;
  constructor(private http:HttpClient) { 
  }
  setUser(user?:User|null){
	  this.user=user;
  }

  	login(email:string,password:string):Observable<LoginResponse>{

		return	this.http.post<LoginResponse>('http://localhost:3000/api/users/login',{email,password})
	  }
	  signUp(body:any):Observable<LoginResponse>
	  {
		return	this.http.post<LoginResponse>('http://localhost:3000/api/users/signup',body)

	  }
	  checkavailability(filed:string,value:string){
		  return this.http.get(' http://localhost:3000/api/users/availability/'+filed+'/'+value)
	  }

}
