import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, observable, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
	user:User|null;
	token:string;
  constructor(private authService:AuthService,private router:Router) {
   }
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	this.user=this.authService.user;
	   if(req instanceof HttpRequest){
		
			if(this.user){
			this.token = this.user!!.token;

		}
		if (this.token) {
	
		  const tokenizedReq = req.clone({ headers: req.headers.set('Authorization',this.token) });
	
		  return next.handle(tokenizedReq);
		}
		return next.handle(req);
	

	   } else 
		return next.handle(req).pipe(map((event: HttpEvent<any>) => {
        	//if(event instanceof HttpRequest>)
		console.log("inter res",event ,)
 return event;
        }),catchError((err:any)=>{
			if(err instanceof HttpErrorResponse){
				if(err.status==401){
					this.authService.logout();
					this.router.navigate(['login'])
				}
			}
			
			return of( err);
			;
			
		}));


  } 
  

}
