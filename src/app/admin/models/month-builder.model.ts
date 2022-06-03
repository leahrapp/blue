


export interface MonthModel{

    month:number; 
    monthName:string; 
    year:number; 
    daysInMonth:number; 
    weeks:WeekModel[]; 
    monthWeekdayStart:number; 


}



export interface WeekModel{

    days:DayModel[]; 

}


export interface DayModel{

    holiday:string; 
    disabled:boolean; 
    weekDay:number; 
    date:string; 
    displayed:boolean; 
    className:string; 
}