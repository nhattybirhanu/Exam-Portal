import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStudentComponent } from '../app-student/app-student.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/AuthGuard';
import { MaterialModule } from '../material-module';
import { OverlayModule } from '@angular/cdk/overlay';
import { SubjectComponent } from '../subject/subject.component';
import { StudentCoursesComponent } from '../student-courses/student-courses.component';



@NgModule({
  declarations: [
	AppStudentComponent,
	StudentCoursesComponent

  ],
  imports: [
	OverlayModule,
    CommonModule,
	RouterModule.forChild([
        { path: '', component: AppStudentComponent},
		{ path: 'courses', component: StudentCoursesComponent},
      ])
	  ,MaterialModule],
  providers:[AuthGuard],
bootstrap: [AppStudentComponent]

},
)
export class StudentModule { }
