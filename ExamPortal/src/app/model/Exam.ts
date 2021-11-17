import { Course } from "./Course";
import { ExamTakers } from "./ExamTakers";

export interface Exam{
	_id:string;
	title:string;
	question:string;
	available:boolean;
	startDate:number;
	endDate:number;
	weight:number;
	subject:Course;
	prof_fullname:string;
	examtakers:ExamTakers[];
}