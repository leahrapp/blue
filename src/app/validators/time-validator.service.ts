import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';

@Injectable({ providedIn: 'root' })


export class TimeValidatorService {
    
  isNumber(time:string): Observable<boolean> {
  
if(time && time.length<3 && time.length>0 ){
 
   if(time.charAt(0)=="0"){
     time = time.substring(1); 
    
   }

    if(time!="0" &&!Number(time)){
     
            return of(true)
    }else{
 
    return of(false);
    }
  }
  return of(true);
}

}