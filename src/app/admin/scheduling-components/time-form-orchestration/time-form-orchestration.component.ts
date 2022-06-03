import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TimeForm, DaySchedule } from "src/app/admin/models/time-selector.model";

import { ScheduleClockService } from "src/app/admin/schedule-manager/services/schedule-clock.service";
import { DaySchedulerService } from "src/app/admin/schedule-manager/services/day-scheduler.service";
import { TwelveHour, ApptHour } from "src/app/constants/Clock.interface";

@Component({
  selector: 'app-time-form-orchestration',
  templateUrl: './time-form-orchestration.component.html',
  styleUrls: ['./time-form-orchestration.component.scss']
})
export class TimeFormOrchestrationComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef, private blockService:DaySchedulerService) { }
  apptBlock:DaySchedule = {} as DaySchedule; 
  startTime: TimeForm = {
    timeHourDisplay: "08",
    timeMinDisplay: "00",
    timeHour: 8,
    timeMin: 0,
    meridiem: 0
  };
  endTime: TimeForm = {
    timeHour: 0,
    timeMin: 30,
    timeHourDisplay: "08",
    timeMinDisplay: "30",
    meridiem: 0
  }
  apptTime: TimeForm = {
    timeHour: 0,
    timeMin: 30,
    timeHourDisplay: "00",
    timeMinDisplay: "30",
    meridiem: 0
  };

  startClock = new TwelveHour();
  endClock = new TwelveHour();
  apptClock = new ApptHour();
  startServe = new ScheduleClockService();
  apptServe = new ScheduleClockService();
  endServe = new ScheduleClockService();


  endTimeUpdate: boolean = true;

  ngOnInit(): void {
    this.startServe.updateTime(this.startTime);
    this.apptServe.updateTime(this.apptTime);
    this.endServe.updateTime(this.endTime);

    this.startServe.inputedTime.subscribe((resp: TimeForm) => {
      this.startTime = resp;
      this.endTimeUpdater();
      this.cdr.markForCheck()

    }
    )

    this.apptServe.inputedTime.subscribe(resp => {
// if else stops recursive loop
      if (this.endTimeUpdate) {
        this.apptTime = resp;
        this.endTimeUpdater();
      }
      else {
        this.endTimeUpdate = true;
      }
      this.cdr.markForCheck();

    })

    this.endServe.inputedTime.subscribe(resp => {
      this.endTime = resp;
      this.apptTimeUpdater();
      this.cdr.markForCheck();
    })

  }

addHours(){

this.apptBlock.startTime= this.startTime; 
this.apptBlock.startMinutes= (this.startTime.timeHour*60)+this.startTime.timeMin; 

this.apptBlock.endTime= this.endTime; 
this.apptBlock.endMinutes= (this.endTime.timeHour*60)+this.endTime.timeMin; 

this.apptBlock.apptTime= this.apptTime; 
this.apptBlock.apptMinutes= (this.apptTime.timeHour*60)+this.apptTime.timeMin; 

this.blockService.addSchedule(this.apptBlock); 

}

  endTimeUpdater() {

    const startHour = this.startTime.timeHour;

    const appTimes = (startHour* 60) +
      this.startTime.timeMin +
      this.apptTime.timeHour * 60 +
      this.apptTime.timeMin;

    var _endHour = Math.floor(appTimes / 60);
    const endMin = appTimes % 60;
    this.endTime.timeHour = _endHour;
    this.endTime.timeMin = endMin;
    this.endTime.timeHourDisplay = this.endClock.HourClock.get(_endHour)!;
    this.endTime.timeMinDisplay = this.endClock.MinuteClock.get(endMin)!;
    this.endTime.meridiem = (this.endTime.meridiem == 0 && _endHour > 11) ? 1 : 0;

    this.endServe.updateTime(this.endTime);

  }

  apptTimeUpdater() {
    const startHour = this.startTime.timeHour;
    const endHour = this.endTime.timeHour;

    const startTime = (startHour * 60) +
      this.startTime.timeMin;

    const endTime = (endHour * 60) +
      this.endTime.timeMin;

    var _appTime = endTime - startTime;

    if (_appTime < 1) {

      this.apptTime.timeHour = 0;
      this.apptTime.timeMin = 1


    }

    else {
      this.apptTime.timeHour = Math.floor(_appTime / 60);
      this.apptTime.timeMin = _appTime % 60;
    }
    this.apptTime.timeHourDisplay = this.apptClock.HourClock.get(this.apptTime.timeHour)!;
    this.apptTime.timeMinDisplay = this.apptClock.MinuteClock.get(this.apptTime.timeMin)!;

    this.endTimeUpdate = false;
    this.apptServe.updateTime(this.apptTime);

  }

  addTimes(){


    


  }

}
