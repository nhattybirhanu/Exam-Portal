import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-app-proffesior',
  templateUrl: './app-proffesior.component.html',
  styleUrls: ['./app-proffesior.component.css']
})
export class AppProffesiorComponent implements OnInit {
	showFiller:boolean=false;
@ViewChild('drawer') drawer:any;
  constructor(element:ElementRef) {
	console.log(element.nativeElement)

   }

  ngOnInit(): void {
  }
  onShowMenu(shomenu:boolean){

	this.drawer.toggle()

  }
  ngAfterViewInit(): void {

	  
  }
  
  

}
