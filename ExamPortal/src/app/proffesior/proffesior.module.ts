import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppProffesiorComponent } from '../app-proffesior/app-proffesior.component';
import { RouterModule } from '@angular/router';
import { NavBar2 } from '../Navbar2.component';

import { OverlayModule } from '@angular/cdk/overlay';
import {  MaterialModule } from '../material-module';
import { ProffesiorHomeComponent } from '../proffesior-home/proffesior-home.component';
import { ProffesiorExamCreatorComponent } from '../proffesior-exam-creator/proffesior-exam-creator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfStudentComponent } from '../prof-student/prof-student.component';
import { StudentTableComponent } from '../student-table/student-table.component';
import { ExamListComponent } from '../exam-list/exam-list.component';
import { ExamCardComponent } from '../exam-card/exam-card.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../interceptor.service';
import { SubjectComponent } from '../subject/subject.component';
import { NgxEditorModule,schema } from 'ngx-editor';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import {CookieService} from 'ngx-cookie-service'


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
	,MaterialModule ,OverlayModule,ReactiveFormsModule,FormsModule,
	NgxEditorModule.forRoot({
		locals: {
		  // menu
		  bold: 'Bold',
		  italic: 'Italic',
		  code: 'Code',
		  blockquote: 'Blockquote',
		  underline: 'Underline',
		  strike: 'Strike',
		  bullet_list: 'Bullet List',
		  ordered_list: 'Ordered List',
		  heading: 'Heading',
		  h1: 'Header 1',
		  h2: 'Header 2',
		  h3: 'Header 3',
		  h4: 'Header 4',
		  h5: 'Header 5',
		  h6: 'Header 6',
		  align_left: 'Left Align',
		  align_center: 'Center Align',
		  align_right: 'Right Align',
		  align_justify: 'Justify',
		  text_color: 'Text Color',
		  background_color: 'Background Color',
  
		  // popups, forms, others...
		  url: 'URL',
		  text: 'Text',
		  openInNewTab: 'Open in new tab',
		  insert: 'Insert',
		  altText: 'Alt Text',
		  title: 'Title',
		  remove: 'Remove',
		},
	  })
  ],
  providers:[
	  CookieService,
	{provide:HTTP_INTERCEPTORS,useClass:InterceptorService, multi:true},
	{
		provide: HIGHLIGHT_OPTIONS,
		useValue: {
			fullLibraryLoader: () => import('highlight.js'),
	
		
		}
	  }
	
  ],
  bootstrap:[AppProffesiorComponent]
})
export class ProffesiorModule { }
