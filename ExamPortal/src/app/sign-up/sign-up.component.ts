import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounce, map, Observable, of, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../model/User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../login/login.component.css']
})
export class SignUpComponent implements OnInit ,OnDestroy{
	signuping:boolean=false;
	signupForm:FormGroup;
	subscription:Subscription|undefined;
	validusername:unknown=null
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router) {

	this.signupForm=formBuilder.group({
		'fullname':['',[Validators.required]],
		'username': ['', Validators.compose([Validators.required])],
		'email': ['', [
			Validators.required,
			Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
		  ]],
		  'password': ['', Validators.required],
		'role': ['', Validators.compose([Validators.required])],
	  
		},
		);

		this.subscription=this.signupForm?.get('username')?.statusChanges.subscribe(data=>{
			this.signuping=false;
			this.validusername=false
			if(data=='VALID')
			this.validusername=true

			console.log(data)
		})
		this.signupForm.get('username')?.setAsyncValidators([this.isValiduserNameNotInList('username')])
		this.signupForm.get('email')?.setAsyncValidators([this.isValiduserNameNotInList('email')])
	}
  
   onSubmit(){
this.signuping=true;
console.log(this.signupForm.value)
this.authService.signUp(this.signupForm.value).subscribe(
	response =>{
		this.signuping=false;
		const user:User=response.data;
		this.authService.setUser(user)
		this.router.navigate(['proffesior']);
		console.log(response);
		},
		error => 
		{
	this.signuping=false;
	console.error(error);
	})

   }

  ngOnInit(): void {
 	 }

	  ngOnDestroy(): void {
		this.subscription?.unsubscribe()
	  }
	  isValiduserNameNotInList(field:string): AsyncValidatorFn {
		let err: ValidationErrors = { 'exists': true };
		return (control: AbstractControl): Observable<ValidationErrors|null>=> {
			return this.authService.checkavailability(field,this.signupForm.controls[field].value).pipe(
			map((res:any)=>{

				console.log( res ? null : {'exit':true},control)
				return res ? null : {'exit':true}
			})	)
		
		};
	  }
}
