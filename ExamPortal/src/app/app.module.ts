import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';


import { LoginComponent } from './login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'

import {MatButtonModule} from '@angular/material/button';
import { SignUpComponent } from './sign-up/sign-up.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppStudentComponent } from './app-student/app-student.component';
import { AuthGuard } from './guards/AuthGuard';
import { NavBar } from './Navbar.component';
import { AppProffesiorComponent } from './app-proffesior/app-proffesior.component';
import {MatSelectModule} from '@angular/material/select';
import { LogoutComponent } from './logout/logout.component';
import { InterceptorService } from './interceptor.service';
import { SubjectComponent } from './subject/subject.component';
import { MaterialModule } from './material-module';
import { AuthService } from './auth.service';
import { NgxEditorModule } from 'ngx-editor';
import {CookieService} from 'ngx-cookie-service';
import { StudentExamComponent } from './student-exam/student-exam.component';
import { StudentExamListComponent } from './student-exam-list/student-exam-list.component';
import { ExamRoomComponent } from './exam-room/exam-room.component';
import { ExamDetailComponent } from './exam-detail/exam-detail.component';
import { ExamGradingComponent } from './exam-grading/exam-grading.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent
		,NavBar, LogoutComponent, SubjectComponent, StudentExamComponent

],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
	ReactiveFormsModule,
	HttpClientModule,
	MaterialModule

  ],
  providers: [AuthGuard,{provide:HTTP_INTERCEPTORS,useClass:InterceptorService, multi:true},AuthService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
