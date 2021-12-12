import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['../login/login.component.css']

})
export class LogoutComponent implements OnInit {

  constructor(authService:AuthService) {
	  authService.setUser(null)
   }

  ngOnInit(): void {
  }

}
