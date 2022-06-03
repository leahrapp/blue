import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DaySchedulerService } from "src/app/admin/schedule-manager/services/day-scheduler.service";
import { DaySchedule } from "src/app/admin/models/time-selector.model";
import { FrontEndSchedBlockModel, SchedBlockModel } from "src/app/admin/models/front-end-sched-block.model";
@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.scss']
})
export class DayScheduleComponent implements OnInit {
minutesInDay:number=1440;
  constructor(private dayServe:DaySchedulerService, private cdr:ChangeDetectorRef) { }

timeBlocks:DaySchedule[]; 

fullBlocks:SchedBlockModel[]= new Array<SchedBlockModel>(); 
emptyBlocks:SchedBlockModel[]= new Array<SchedBlockModel>(); 
dayBlock:SchedBlockModel[]=new Array<SchedBlockModel>(); 
  ngOnInit(): void {


    this.dayServe.addBlock.subscribe((block:DaySchedule)=>{

const newBlock= {} as SchedBlockModel; 

newBlock.startMin= block.startMinutes; 
newBlock.endMin= block.endMinutes; 

this.fullBlocks.push(newBlock); 

if(this.fullBlocks && this.fullBlocks.length>0){

this.fullBlocks.sort(function(a, b){
return  a.startMin-b.startMin; 
})



for(var i=0; i<this.fullBlocks.length-1; i++){

  const empty = this.fullBlocks[i+1].startMin -this.fullBlocks[i].endMin  ; 
console.log(empty)
  if(empty>0){

    const emptyBlock= {} as SchedBlockModel; 

    emptyBlock.startMin= this.fullBlocks[i].endMin+1; 
    emptyBlock.endMin= this.fullBlocks[i+1].startMin-1; 
    this.emptyBlocks.push(emptyBlock); 

  }

}
}
this.cdr.markForCheck(); 
    })
  }


  idk(minute:number){

    let retClass= "no-class"
if(this.fullBlocks!=undefined){
    this.fullBlocks.forEach(fullBlock=>
      {

        if(minute>=fullBlock.startMin && minute<=fullBlock.endMin){
          retClass= "full-block";
        }

      })
    }

    if(this.emptyBlocks!=undefined){

this.emptyBlocks.forEach(emptyBlock=>{

if(minute>=emptyBlock.startMin && minute<=emptyBlock.endMin){
  retClass = "empty-block"
}


})
    }

return  retClass;


  }

}
