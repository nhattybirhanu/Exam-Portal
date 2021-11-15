import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppProffesiorComponent } from '../app-proffesior/app-proffesior.component';
import { RouterModule } from '@angular/router';
import { NavBar2 } from '../Navbar2.component';

import { OverlayModule } from '@angular/cdk/overlay';
import {  MaterialModule } from '../material-module';
import { ProffesiorHomeComponent } from '../proffesior-home/proffesior-home.component';
import { ProffesiorExamCreatorComponent } from '../proffesior-exam-creator/proffesior-exam-creator.component';



@NgModule({
  declarations: [
	AppProffesiorComponent,
	NavBar2,
	ProffesiorHomeComponent,
	ProffesiorExamCreatorComponent

  ],
  imports: [
    CommonModule,
	RouterModule.forChild([
		
		{path:'',component:AppProffesiorComponent,
		
		children:[
			{path:'proffesior/home',component:ProffesiorHomeComponent},
			{path:'proffesior/newexam',component:ProffesiorExamCreatorComponent}

		]}

	])
	,MaterialModule ,OverlayModule
  ],
  bootstrap:[AppProffesiorComponent]
})
export class ProffesiorModule { }
