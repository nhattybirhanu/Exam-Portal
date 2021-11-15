import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proffesior-exam-creator',
  templateUrl: './proffesior-exam-creator.component.html',
  styleUrls: ['./proffesior-exam-creator.component.css']
})
export class ProffesiorExamCreatorComponent implements OnInit {
	examForm:FormGroup;
	creating:boolean=false
  constructor(private formBuilder:FormBuilder) {
	this.examForm=formBuilder.group({
		'title':['',Validators.required],
		'question':['',Validators.required],
		'avaliable':[true,Validators.required],
		'startDate':['',Validators.required],
		'endDate':['',Validators.required],
		'weight':['',Validators.required],

		
	})

   }
   onSubmit(){
	   console.log(this.toTimestamp(this.examForm.get('startDate')?.value))
   }

  ngOnInit(): void {
  }
   toTimestamp(strDate:string){
	var datum = Date.parse(strDate);
	return datum/1000;
 }

}
