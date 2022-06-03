import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-builder',
  templateUrl: './day-builder.component.html',
  styleUrls: ['./day-builder.component.scss']
})
export class DayBuilderComponent implements OnInit {

  constructor() { }
  className:string; 
  ngOnInit(): void {
  }


  isHoliday(){

    if(true){
      this.className=="holidayClass"
    }
    
    
    }
}
