import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Exam } from './model/Exam';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class ExamServiceService {
	currentExam:Exam;
	myExamList:Exam[]=[];


  constructor(private http:HttpClient,private authService:AuthService) { }

	creatExam(exam:any):Observable<Exam>{
		exam.prof_username=this.authService.user.username
		exam.prof_fullname=this.authService.user.fullname

		return this.http.post<Exam>('http://localhost:3000/api/professor/createexam',exam)
	}
	setCurrentExam(exam:Exam){
		this.currentExam=exam;
	}
	getProff():Observable<Exam[]>{
		console.log(this.authService.user)
		return this.http.get<Exam[]>('http://localhost:3000/api/professor/exams/'+this.authService.user?.username);
	}
	getCourse():Observable<User[]>{
		return this.http.get<User[]>("http://localhost:3000/api/student/allcourse")
	}
	getExam():Observable<Exam[]>{
		console.log("getting exams")
		return this.http.get<Exam[]>("http://localhost:3000/api/student/exams/"+this.authService
		.user._id)

	}
	setExams(exams:Exam[]){
		this.myExamList=exams;
	}
	postAnswer(answer:any):Observable<any>{
		return this.http.put("http://localhost:3000/api/student/postanswer/",answer);
	}
	postGrade(grade:any):Observable<any>{
	return	this.http.put<any>('http://localhost:3000/api/professor/grade',grade);
	}

}
