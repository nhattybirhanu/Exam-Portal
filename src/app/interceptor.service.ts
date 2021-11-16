import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
	user:User|null;
	token:string;
  constructor(private authService:AuthService) {
   }
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	this.user=this.authService.user;

	if(this.user){
		this.token = this.user.token;

	}
    if (this.token) {

      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization',this.token) });
		console.log("inter ",this.token,tokenizedReq)

      return next.handle(tokenizedReq);
    }
    return next.handle(req);
  }

}
