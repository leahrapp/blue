export class DateSelect{

    month:number; 
    week:number; 
    day:number; 

}

export class DateRange{

    startDateRange:Date= new Date(); 
    endDateRange:Date= new Date(this.startDateRange.getFullYear(), this.startDateRange.getMonth(), this.startDateRange.getDate()+90)


  }