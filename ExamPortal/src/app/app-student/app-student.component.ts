import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';

@Component({
  selector: 'app-app-student',
  templateUrl: './app-student.component.html',
  styleUrls: ['./app-student.component.css']
})
export class AppStudentComponent implements OnInit {
	isOpen:boolean=false;
	user:User;
	trigger=CdkOverlayOrigin

  constructor() { }

  ngOnInit(): void {
  }

}
