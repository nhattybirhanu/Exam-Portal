import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
	myForm: FormGroup;
	private subscription: Subscription | undefined;
	signing:boolean=false;
  constructor(private formBuilder: FormBuilder) { 
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
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
