import { BehaviorSubject, Observable } from "rxjs";
import { TimeForm, DaySchedule } from "src/app/admin/models/time-selector.model";

import { Injectable } from "@angular/core";



@ Injectable({ providedIn: 'root'})
export class ScheduleClockService{

private timeSource= new BehaviorSubject<TimeForm>( {} as TimeForm); 

inputedTime = this.timeSource.asObservable(); 

updateTime(time: TimeForm): void {
    this.timeSource.next(time); 
}


private dayScheduleSource= new BehaviorSubject<DaySchedule>({} as DaySchedule); 
 daySchedule= this.dayScheduleSource.asObservable(); 

updateSchedule(day:DaySchedule){

    this.dayScheduleSource.next(day); 
}
}