import { ExamTakers } from "./ExamTakers";

export interface Exam{
	title:string;
	question:string;
	available:boolean;
	startDate:number;
	endDate:number;
	weight:number;
	examtakers:ExamTakers[];
}