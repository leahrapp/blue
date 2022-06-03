import {  AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function isNumberValidator(max:number, min:number): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
       
      const forbidden = control.value>min&& control.value<max; 
    
      return forbidden ? {OutOfRange: {value: control.value}} : null;
    };
}