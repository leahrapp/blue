

export interface WorkWeek{

    WorkDays:WorkDay[]; 


}

export interface WorkDay {
   

    DayOfWeek:Date[]; 
    AppointmentTimes:TimeBlock[]; 
  
}

export class NewTimeBlock implements TimeBlock{
    StartTime:Date = new Date;
    BlockTime:number = 0; 

}
export interface TimeBlock{
StartTime:Date; 
BlockTime:number; 

}


export class NewCalendarFiller implements CalendarFiller{
year:Date; 

months:NewMonthFiller[] = new Array<NewMonthFiller>(); 


} 

export interface CalendarFiller{
   year:Date; 
    months:MonthFiller[];

}

export class NewMonthFiller implements MonthFiller{

month:string; 
weeks:NewWeekFiller[] = new Array<NewWeekFiller>(); 

}
export interface MonthFiller{
    month:string;
    weeks:WeekFiller[]; 
}


export class NewWeekFiller implements WeekFiller{
    days: NewDayFiller[] = new Array<NewDayFiller>();
}
export interface WeekFiller{

    days:DayFiller[]
}

export class NewDayFiller implements DayFiller {

    dayOfWeek: string;
    day: number;
    appointment: NewTimeBlock[]=  new Array<TimeBlock>();   


}
export interface DayFiller{

    dayOfWeek:string; 
    day:number; 
appointment:TimeBlock[]; 
}