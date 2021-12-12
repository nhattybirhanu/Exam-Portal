import { style } from "@angular/animations";
import { Component, EventEmitter, Output } from "@angular/core";
import { AuthService } from "./auth.service";
import { User } from "./model/User";

@Component({
	selector: 'app-nav2',
	template:`
	
	<mat-toolbar color="primary">
	
	<mat-toolbar-row>
	<button mat-icon-button class="example-icon" (click)="showMenuAction()" aria-label="Example icon-button with menu icon">
	<mat-icon>menu</mat-icon>
  </button>
	  <span>Examable</span>
	  <span class="nav-spacer"></span>
	

<!-- This template displays the overlay content and is connected to the button -->
<ng-template
  cdkConnectedOverlay
  [cdkConnectedOverlayOrigin]="trigger"
  [cdkConnectedOverlayOpen]="isOpen"
>
<mat-card  class="nav-profile" >


<mat-card-title>	 {{user.name}}
</mat-card-title>
<mat-card-subtitle>	 {{user.email}}
</mat-card-subtitle>
<mat-card-actions >
	<a mat-stroked-button [routerLink]="['/logout']" >Logout</a>
	
</mat-card-actions>

</mat-card>


</ng-template>

	  <button mat-flat-button color="primary" (click)="isOpen = !isOpen" type="button" cdkOverlayOrigin #trigger="cdkOverlayOrigin">
	 {{user.name}}
	  <mat-icon class="nav-icon" aria-hidden="false" aria-label="Example user verified icon">account_circle</mat-icon>

	  </button>

	</mat-toolbar-row>

  </mat-toolbar>
	`
	
  },
  )
export class NavBar2{
	user:User;
	@Output() shomMenuEvent:EventEmitter<boolean>=new EventEmitter();

	showMenu:boolean=false;
	isOpen:boolean=false;
	constructor(private authService:AuthService){
		this.user=authService.user;
	}
	showMenuAction(){
	this.showMenu=!this.showMenu;
	this.shomMenuEvent.emit(this.showMenu)
	console.log("Side Bar action")
	}

}