import { ExamTakers } from "./ExamTakers";

export interface Quesiton{
	title:string;
	question:string;
	available:boolean;
	startDate:number;
	endDate:number;
	weight:number;
	examtakers:ExamTakers[];
}