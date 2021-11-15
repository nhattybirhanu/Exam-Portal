import { style } from "@angular/animations";
import { Component } from "@angular/core";

@Component({
	selector: 'app-nav1',
	template:`
	
	<mat-toolbar color="primary">
	
	<mat-toolbar-row>
	  <span>Examable</span>
	  <span class="nav-spacer"></span>
	  <mat-icon class="nav-icon" aria-hidden="false" aria-label="Example user verified icon">account_circle</mat-icon>
	</mat-toolbar-row>

  </mat-toolbar>
	`
	
  },
  )
export class NavBar{

}