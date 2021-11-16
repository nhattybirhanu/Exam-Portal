import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from './model/Exam';

@Injectable({
  providedIn: 'root'
})
export class ExamServiceService {

  constructor(private http:HttpClient) { }

	creatExam(exam:any):Observable<Exam>{
			
		return this.http.post<Exam>('http://localhost:3000/api/professor/createexam',exam)
	}

}
