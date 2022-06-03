export interface FrontEndDayModel {
    restricted:boolean; 
    date: string;
    tooltip: string;
    daySelected: boolean;
    colSelected:boolean; 
    day:number; 
  fullDate:Date; 
  }
  
  export class FrontEndMonthModel {
    month: string;
    year:string; 
    days: Array<FrontEndDayModel>;
  }
  
 