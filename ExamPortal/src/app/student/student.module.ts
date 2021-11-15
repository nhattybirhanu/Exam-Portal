import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStudentComponent } from '../app-student/app-student.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/AuthGuard';



@NgModule({
  declarations: [
	AppStudentComponent

  ],
  imports: [
    CommonModule,
	RouterModule.forChild([
        { path: '', component: AppStudentComponent},

      ])
  ],
  providers:[AuthGuard],
bootstrap: [AppStudentComponent]

},
)
export class StudentModule { }
