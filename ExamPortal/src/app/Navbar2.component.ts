import { style } from "@angular/animations";
import { Component, EventEmitter, Output } from "@angular/core";

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
  <ul class="example-list">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</ng-template>

	  <button mat-flat-button color="primary" (click)="isOpen = !isOpen" type="button" cdkOverlayOrigin #trigger="cdkOverlayOrigin">
	  Nhatty Birhanu 
	  <mat-icon class="nav-icon" aria-hidden="false" aria-label="Example user verified icon">account_circle</mat-icon>

	  </button>

	</mat-toolbar-row>

  </mat-toolbar>
	`
	
  },
  )
export class NavBar2{
	@Output() shomMenuEvent:EventEmitter<boolean>=new EventEmitter();

	showMenu:boolean=false;
	isOpen:boolean=false;

	showMenuAction(){
	this.showMenu=!this.showMenu;
	this.shomMenuEvent.emit(this.showMenu)
	console.log("Side Bar action")
	}

}