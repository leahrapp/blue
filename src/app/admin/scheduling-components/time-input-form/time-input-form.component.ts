import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import {  TimeForm } from "src/app/admin/models/time-selector.model";
import { FormGroup, FormBuilder} from "@angular/forms";

import { timeIsNumberValidator } from "src/app/validators/time-validator";
import { TimeValidator } from "src/app/validators/time-validator";
import { TimeValidatorService } from "src/app/validators/time-validator.service";

import { ScheduleClockService } from "src/app/admin/schedule-manager/services/schedule-clock.service";

import { Clock} from "src/app/constants/Clock.interface";

import { of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-time-input-form',
  templateUrl: './time-input-form.component.html',
  styleUrls: ['./time-input-form.component.scss']

})
export class TimeInputFormComponent implements OnInit {

  apptForm: FormGroup;


  constructor(private fb: FormBuilder, private timeService: TimeValidatorService, private cdr: ChangeDetectorRef) { }
  selectedHour: string = '08';
  selectedMinute = "00";

  @Input() schedService: ScheduleClockService;
  @Input() hasMeridium: boolean;
  @Input() clock: Clock;
@ViewChild("tmHr", {static:true}) tmHr:ElementRef; 
@ViewChild("tmMn", {static:true}) tmMn:ElementRef; 
  timeConfig: TimeForm;
  ngOnInit(): void {

    this.apptForm = this.fb.group({
      timeHour: [],
      timeHourDisplay: ['', { asyncValidators: [timeIsNumberValidator(this.timeService)] }],
      timeMin: [],
      timeMinDisplay: ['', { asyncValidators: [timeIsNumberValidator(this.timeService)] }],
      meridiem: []

    });

 

    this.schedService.inputedTime.subscribe((time: TimeForm) => {

      if (time != undefined) {
        this.apptForm.patchValue(time);
        this.timeConfig = time;
      }

      this.cdr.markForCheck();
    })

fromEvent(this.tmHr.nativeElement, 'keyup').pipe(
  map((event:any)=>{return event?.target.value }), debounceTime(1000)).subscribe((hour:string)=>{

   

    if (hour.charAt(0) === "0") {
      hour = hour.substring(1);
    }

    if (Number(hour) && this.clock.HourClock.has(Number(hour))) {
    
      this.timeConfig.timeHour = (Number(hour));
      this.timeConfig.timeHourDisplay = this.clock.HourClock.get(Number(hour))!;
     
      this.schedService.updateTime(this.timeConfig);
    }


  });
  
  fromEvent(this.tmMn.nativeElement, 'keyup').pipe(
    map((event:any)=>{return event?.target.value }), debounceTime(1000)).subscribe((minute:string)=>{
  
      if (minute.charAt(0) === "0") {
        minute = minute.substring(1);
      }
  
      console.log(minute)
      if (Number(minute) && this.clock.MinuteClock.has(Number(minute))) {
        console.log(this.timeConfig)
        this.timeConfig.timeMin = Number(minute);
        this.timeConfig.timeMinDisplay = this.clock.MinuteClock.get(Number(minute))!;
      }
  
  
      this.schedService.updateTime(this.timeConfig);
  
  
    });
 

  }

  get timeHourDisplay(){
      return this.apptForm.controls['timeHourDisplay'];
  }

  minuteRoll(direction: number) {
    var minute = this.apptForm.get("timeMin")!.value + direction;
    if (this.clock.MinuteClock.has(minute)) {
      this.timeConfig.timeMin = minute;
      this.timeConfig.timeMinDisplay = this.clock.MinuteClock.get(minute)!;
    }

    this.schedService.updateTime(this.timeConfig);
    this.apptForm.patchValue(this.timeConfig);
  }


  hourRoll(direction: number) {
    var hour = this.apptForm.get("timeHour")!.value + direction;
    if (this.clock.HourClock.has(hour)) {
      this.timeConfig.timeHour = hour;
      this.timeConfig.timeHourDisplay = this.clock.HourClock.get(hour)!;
      this.timeConfig.meridiem = (hour > 11) ? 1 : 0;

    }
    this.apptForm.patchValue(this.timeConfig);
    this.schedService.updateTime(this.timeConfig);

  }




}
