import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
	myForm: FormGroup;
	private subscription: Subscription | undefined;
	signing:boolean=false;
  constructor(private formBuilder: FormBuilder,private authservice:AuthService) { 
	this.myForm = formBuilder.group({
		
		'email': ['', [
		  Validators.required,
		  Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
		]],
		'password': ['', Validators.required],
		
	  });
  
	  this.subscription = this.myForm?.valueChanges.subscribe(
		(data: any) =>{
			this.signing=false;
			
		//	console.log(data)
	}
	  );


  }
  onSubmit(){
	  console.log(this.myForm.value)
	  this.signing=true;
	  this.authservice.login(this.myForm.get('email')?.value,this.myForm.get('password')?.value).subscribe(
		response =>{
			this.signing=false;
			console.log(response)
	},
	error => 
	{
		this.signing=false;
		console.error(error)

	}

	  )
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
