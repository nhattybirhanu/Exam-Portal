import { Course } from "./Course";

export class User{
	_id:string
	username:string
	fullname:string
	email:string
	role:string
	postion:string;
	subject:Course[];
	token:string;
	course?:Course|unknown;
	
}