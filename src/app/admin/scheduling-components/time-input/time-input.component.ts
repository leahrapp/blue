import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { TimeSelector } from "src/app/admin/models/time-selector.model";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";

import { TimeValidatorService } from "src/app/validators/time-validator.service";
import { ScheduleTimeService } from '../../schedule-manager/services/schedule-time.service';
@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss']

})
export class TimeInputComponent implements OnInit {

  apptForm: FormGroup;
  constructor(private fb: FormBuilder, private timeService: TimeValidatorService, private cdr: ChangeDetectorRef) { }
  selectedHour: string = '08';
  selectedMinute = "00";
changeMeridian=true; 

  @Input() schedService: ScheduleTimeService;
  @Input() hasMeridium:boolean; 
  
  timeConfig: TimeSelector = new TimeSelector();
  ngOnInit(): void {

    this.apptForm = this.fb.group({
      timeHour: ['', { asyncValidators: this.timeService.isNumber }],
      timeMin: [''],
      meridiem: [0]

    });


    this.schedService.inputedTime.subscribe((time: TimeSelector) => {
      if (time != undefined) {
        this.apptForm.patchValue(time);
        this.timeConfig = time;
        if (this.timeConfig.timeHour != time.timeHour || this.timeConfig.timeMin != time.timeMin) {
        }
      }

      this.cdr.markForCheck();
    })

  }

  minuteRoll(minute: string, direction: number) {
    var newMinute = this.isNumber(minute, this.timeConfig.maxMinute);
    if (direction > 0) {
      newMinute = this.rollUp(newMinute, this.timeConfig.maxMinute, this.timeConfig.minMin);
    }
    else {
      newMinute = this.rollDown(newMinute, this.timeConfig.maxMinute, this.timeConfig.minMin);
    }
    this.timeConfig.timeMin = newMinute.toString();
    this.schedService.updateTime(this.timeConfig);
    this.apptForm.patchValue({ timeMin: this.stringTimeUnit(newMinute) });
  }


  hourRoll(hour: string, direction: number) {
    var newHour = this.isNumber(hour, this.timeConfig.maxHour - 1);
    const tempHour= newHour; 
    if (direction > 0) {
      newHour = this.rollUp(newHour, this.timeConfig.maxHour, this.timeConfig.minHour);
      if(newHour==12 && this.timeConfig.meridiem==0){
        this.timeConfig.meridiem=1; 
      }
    }
    else {
      newHour = this.rollDown(newHour, this.timeConfig.maxHour, this.timeConfig.minHour);
      if(newHour==11 && this.timeConfig.meridiem==1){
        this.timeConfig.meridiem=0; 
      }
    }

   
    this.timeConfig.timeHour = this.stringTimeUnit(newHour);
    this.schedService.updateTime(this.timeConfig);

  }

  rollDown(unit: number, maxNumber: number, minNumber: number): number {
    unit--;
    if (unit < minNumber) {
      unit = maxNumber;
    }
    return unit;
  }

  rollUp(unit: number, maxNumber: number, minNumber: number): number {
    unit++
    if (unit > maxNumber) {
      unit = minNumber;
    }
    return unit;
  }

  isNumber(timeUnit: string, maxUnit: number): number {
    var unit = 0
    if (timeUnit.charAt(0) == "0") {
      timeUnit = timeUnit.substring(1)
    }
    if (Number(timeUnit) && (unit < maxUnit || unit > 0)) {
      unit = Number(timeUnit)
    }
    return unit
  }

  isTime(timeUnit: string, maxUnit: number): number {
    var unit = 0
    if (timeUnit.charAt(0) == "0") {
      timeUnit = timeUnit.substring(1)
    }
    if (Number(timeUnit)) {
      unit = Number(timeUnit)
    }
    return unit
  }

  stringTimeUnit(unit: number): string {
    var stringUnit = unit.toString();
    if (stringUnit.length < 2) {
      stringUnit = "0" + stringUnit;
    }
    return stringUnit;
  }
}
