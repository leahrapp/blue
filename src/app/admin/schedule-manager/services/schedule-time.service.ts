import { BehaviorSubject, Observable } from "rxjs";
import { TimeSelector } from "src/app/admin/models/time-selector.model";

import { Injectable } from "@angular/core";

@ Injectable({ providedIn: 'root'})
export class ScheduleTimeService{

private timeSource= new BehaviorSubject<TimeSelector>(new TimeSelector()); 

inputedTime = this.timeSource.asObservable(); 

updateTime(time: TimeSelector): void {
    this.timeSource.next(time); 
}

}