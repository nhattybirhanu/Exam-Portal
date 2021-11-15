import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from './model/LoginResponce';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { 


  }

  	login(email:string,password:string):Observable<LoginResponse>{

		return	this.http.post<LoginResponse>('http://localhost:3000/users/login',{email,password})
	  }
}
