import { BehaviorSubject } from "rxjs";
import { TimeBlock, NewTimeBlock } from "src/app/admin/models/calendarMaker.interface";
import { Injectable } from "@angular/core";
import { DateSelect, DateRange } from "src/app/admin/models/date-select.model";


@Injectable({
    providedIn: 'root',
   })
export class CalendarBuilderService{

    private dateRangeSource= new BehaviorSubject<DateRange> (new DateRange()); 
    dateRange = this.dateRangeSource.asObservable(); 
        
    setDateRange(dateRange:DateRange){
        this.dateRangeSource.next(dateRange); 
    }




private workdaySource = new BehaviorSubject<TimeBlock>(new NewTimeBlock()); 
workday= this.workdaySource.asObservable(); 

private editWorkdaySource = new BehaviorSubject<TimeBlock>(new NewTimeBlock()); 
editWorkday= this.workdaySource.asObservable(); 



addWorkdays(appointment:TimeBlock){
    this.workdaySource.next(appointment); 
}

editWorkdays(appointment:TimeBlock){
    this.editWorkdaySource.next(appointment); 
}






private unselectedDaySource= new BehaviorSubject<DateSelect>(new DateSelect()); 
unselectedDay= this.unselectedDaySource.asObservable(); 

unSelectDay(day:DateSelect)
    {
        this.unselectedDaySource.next(day); 
    }

    private selectedDaysSource= new BehaviorSubject<DateSelect>(new DateSelect())   
    selectedDay = this.selectedDaysSource.asObservable(); 


    selectDay(day:DateSelect)
    {
      
        this.selectedDaysSource.next(day); 
    }

}