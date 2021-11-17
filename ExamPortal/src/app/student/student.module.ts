import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStudentComponent } from '../app-student/app-student.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/AuthGuard';
import { MaterialModule } from '../material-module';
import { OverlayModule } from '@angular/cdk/overlay';
import { SubjectComponent } from '../subject/subject.component';
import { StudentCoursesComponent } from '../student-courses/student-courses.component';
import { StudentExamListComponent } from '../student-exam-list/student-exam-list.component';
import { ExamRoomComponent } from '../exam-room/exam-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';



@NgModule({
  declarations: [
	AppStudentComponent,
	StudentCoursesComponent,
	StudentExamListComponent,ExamRoomComponent

  ],
  imports: [
	OverlayModule,
    CommonModule,
	RouterModule.forChild([
        { path: '', component: AppStudentComponent,children:
		[{ path: 'courses', component: StudentCoursesComponent},
		{ path: 'exams', component: StudentExamListComponent},
		{ path: 'examroom', component: ExamRoomComponent}

	]},
      ])
	  ,MaterialModule 
	  ,ReactiveFormsModule,FormsModule,
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
	  ,MaterialModule],
  providers:[AuthGuard],
bootstrap: [AppStudentComponent]

},
)
export class StudentModule { }
