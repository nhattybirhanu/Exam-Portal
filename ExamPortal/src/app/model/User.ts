import { Course } from "./Course";

export interface User{
	username:string
	name:string
	email:string
	role:string
	postion:string;
	procourse:Course[];
	token:string;

}