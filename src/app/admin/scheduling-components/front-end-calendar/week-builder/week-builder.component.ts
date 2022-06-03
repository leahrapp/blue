import { Component, OnInit, Input } from '@angular/core';
import { DateRange } from "src/app/admin/models/date-select.model";
import { DayModel } from "src/app/admin/models/month-builder.model";
@Component({
  selector: 'app-week-builder',
  templateUrl: './week-builder.component.html',
  styleUrls: ['./week-builder.component.scss']
})

export class WeekBuilderComponent implements OnInit {

@Input() dateRange: DateRange
 
weekDays:DayModel[]; 

  constructor() { }

  ngOnInit(): void {

  
    this.weekDays= new Array<DayModel>(); 

    
  if(this.dateRange.startDateRange.getDay()>0){
   console.log(this.dateRange.startDateRange)
   for(var i = this.dateRange.startDateRange.getDay(); i>=0; i--){

    let emptyDay = {} as DayModel; 

    emptyDay.displayed=false; 
 
    this.weekDays.push(emptyDay); 


   }
  }
  
  var dateIndex= this.dateRange.startDateRange.getDate();
 
   for(var i = this.dateRange.startDateRange.getDay(); i<= this.dateRange.endDateRange.getDay();  i++){
   

    let nextDay = {} as DayModel; 

    nextDay.displayed=true; 
   nextDay.weekDay=i; 
   nextDay.className= dateIndex.toString() + ""; 
   nextDay.date= dateIndex.toString(); 


   this.weekDays.push(nextDay); 
dateIndex++; 

   }
  

if(this.dateRange.endDateRange.getDay()<6){
  for(var i = this.dateRange.startDateRange.getDay()+1; i<=6 ;  i++){

  let emptyDay = {} as DayModel; 
  this.weekDays.push(emptyDay); 



}


}
 
}}

