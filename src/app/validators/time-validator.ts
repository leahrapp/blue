import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, Validator } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TimeValidatorService } from './time-validator.service';


export class TimeValidator implements Validator{

  constructor(private timeService: TimeValidatorService) {}

  validatorFunction: AsyncValidatorFn = (control) =>
    control?.value !== ""
      ? this.timeService
          .isNumber(control.value)
          .pipe(
            map((isNumber) =>
              isNumber
                ? null
                : { IsNumber: "Not A Number" }
            )
          )
      : of(null);

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    
    return this.validatorFunction(control); 
  }
}




export function timeIsNumberValidator(timeService:TimeValidatorService){

  return (control:AbstractControl)=>{

    return timeService.isNumber(control.value).pipe(map ((ok:boolean)=>ok?{isNotNumber:true}:null))  ;
  }
}