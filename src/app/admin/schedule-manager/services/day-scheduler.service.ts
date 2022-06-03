import { BehaviorSubject, Observable } from "rxjs";
import { TimeForm, DaySchedule } from "src/app/admin/models/time-selector.model";

import { Injectable } from "@angular/core";



@ Injectable({ providedIn: 'root'})
export class DaySchedulerService{



private addBlockSource= new BehaviorSubject<DaySchedule>({} as DaySchedule); 
addBlock= this.addBlockSource.asObservable(); 

addSchedule(day:DaySchedule){

    this.addBlockSource.next(day); 
}


private deleteBlockSource= new BehaviorSubject<DaySchedule>({} as DaySchedule); 
deleteBlock= this.deleteBlockSource.asObservable(); 

removeSchedule(day:DaySchedule){

    this.deleteBlockSource.next(day); 
}

}