import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
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

  constructor(userService:AuthService) {
	  this.user=userService.user;
   }

  ngOnInit(): void {
  }

}
