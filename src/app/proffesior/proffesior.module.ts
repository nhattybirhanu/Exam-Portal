import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppProffesiorComponent } from '../app-proffesior/app-proffesior.component';
import { RouterModule } from '@angular/router';
import { NavBar2 } from '../Navbar2.component';

import { OverlayModule } from '@angular/cdk/overlay';
import {  MaterialModule } from '../material-module';
import { ProffesiorHomeComponent } from '../proffesior-home/proffesior-home.component';
import { ProffesiorExamCreatorComponent } from '../proffesior-exam-creator/proffesior-exam-creator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfStudentComponent } from '../prof-student/prof-student.component';
import { StudentTableComponent } from '../student-table/student-table.component';
import { ExamListComponent } from '../exam-list/exam-list.component';
import { ExamCardComponent } from '../exam-card/exam-card.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../interceptor.service';
import { SubjectComponent } from '../subject/subject.component';



@NgModule({
  declarations: [
	AppProffesiorComponent,
	NavBar2,
	ProffesiorHomeComponent,
	ProffesiorExamCreatorComponent,
	ProfStudentComponent,
	StudentTableComponent,
	ExamListComponent,ExamCardComponent

  ],
  imports: [
    CommonModule,
	RouterModule.forChild([
		
		{path:'',component:AppProffesiorComponent,
		
		children:[
			{path:'proffesior/home',component:ProffesiorHomeComponent},
			{path:'proffesior/newexam',component:ProffesiorExamCreatorComponent },
			{path:'proffesior/students',component:ProfStudentComponent },
			{path:'proffesior/examlists',component:ExamListComponent },
			{path :'proffesior/subject',component:SubjectComponent},

		]}

	])
	,MaterialModule ,OverlayModule,ReactiveFormsModule
  ],
  providers:[
	{provide:HTTP_INTERCEPTORS,useClass:InterceptorService, multi:true}
  ],
  bootstrap:[AppProffesiorComponent]
})
export class ProffesiorModule { }
