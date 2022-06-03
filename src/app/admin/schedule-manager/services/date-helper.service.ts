
export class DateHelperService{
 today:Date = new Date(); 
    
 daysInMonth:Map<number, number> = new Map<number, number>([
     [1,31],
      [2,this.isLeapYear()],
       [3,31],
 [4,30],
 [5,31],
 [6,30],
 [7,31],
 [8,30],
 [9,30],
 [10,31],
 [11,30],
 [12,31]
])


isLeapYear() {
    
    if(this.today.getFullYear()%4==0){
        return 29;
    
    }
    else{
        return 28; 
    }
     
 }


}

 