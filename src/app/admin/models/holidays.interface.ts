export interface Holidays{
    year:number;
    holidays:Array<Holiday>; 
}

export interface Holiday{
    holiday:string; 
    month:number; 
    day:number; 
}