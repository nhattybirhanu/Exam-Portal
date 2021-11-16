import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { User } from "../model/User";
@Injectable({
	providedIn: 'root'
  })
export class AuthGuard implements CanActivate{
	user:User;
	constructor(private router:Router,private authService:AuthService){
		this.user=authService.user;

	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
	Observable<boolean> | boolean {
	// Your logic goes here
	// return true to continue
	// otherwise, you will have to redirect to another route
	this.user=this.authService.user;

	const path=route.routeConfig?.path;
	console.log("route: "+path,this.user)
	if(path?.startsWith('proffesior')){
		if(this.user!=null&&this.user.role==="professor")
		return true;
		else 
		{
		this.router.navigate(['login']);
			return false;
		}	
	} else if(path?.startsWith("student")) {
		if(this.user!=null&&this.user.role==="student")
		return true;
		else 
		{
		this.router.navigate(['login']);
			return false;
		}	
	}
	
	else return true;
	
}
	

}