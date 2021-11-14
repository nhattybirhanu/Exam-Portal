import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../login/login.component.css']
})
export class SignUpComponent implements OnInit ,OnDestroy{
	signuping:boolean=false;
	signupForm:FormGroup;
	subscription:Subscription;
	validusername:unknown=null
  constructor(private formBuilder:FormBuilder) {

	this.signupForm=formBuilder.group({
		'fullname':['',[Validators.required]],
		'username': ['', Validators.compose([Validators.required])],
		'email': ['', [
			Validators.required,
			Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
		  ]],
		  'password': ['', Validators.required],
		  
		});

		this.subscription=this.signupForm.valueChanges.subscribe(data=>{
			this.signuping=false;
		})
		this.signupForm.get('username')?.setAsyncValidators([this.isValiduserNameNotInList()])
		this.signupForm.get('email')?.setAsyncValidators([this.isValiduserNameNotInList()])

		console.log(

		)
	}
  
   onSubmit(){
this.signuping=true;

   }

  ngOnInit(): void {
 	 }

	  ngOnDestroy(): void {
		this.subscription?.unsubscribe()
	  }
	  isValiduserNameNotInList(): AsyncValidatorFn {
		return (control: AbstractControl): Observable<ValidationErrors|null> => {
			let bReturn: boolean = true;
			if (this.signupForm.controls['username'].value == 'test@test.test')
			{
				bReturn = false;
			}
			let err: ValidationErrors = { 'exists': true };
			return bReturn ? of(null) : of(err);
		};
	  }
}
