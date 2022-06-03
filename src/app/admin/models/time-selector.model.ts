
export interface DaySchedule{

    startTime:TimeForm; 
    startMinutes:number; 
    endTime:TimeForm;
    endMinutes: number; 
    apptTime:TimeForm; 
    apptMinutes:number;


}



export class TimeSelector{


maxMinute:number; 
maxHour:number; 
minMin:number; 
minHour:number; 
timeMin:string; 
timeHour:string; 
meridiem:number; 
}

export interface TimeForm{


    timeMin:number; 
    timeHour:number;
    timeMinDisplay:string; 
    timeHourDisplay:string;  
    meridiem:number; 


}

export interface ConcreteTimeForm{}