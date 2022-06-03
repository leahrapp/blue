import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TimeSelector } from "src/app/admin/models/time-selector.model";
import { ScheduleTimeService } from "src/app/admin/schedule-manager/services/schedule-time.service";
@Component({
  selector: 'app-time-orchestration',
  templateUrl: './time-orchestration.component.html',
  styleUrls: ['./time-orchestration.component.scss']
})
export class TimeOrchestrationComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef) { }
  startTime = new TimeSelector();
  endTime = new TimeSelector();
  apptTime = new TimeSelector();

  startServe = new ScheduleTimeService();
  apptServe = new ScheduleTimeService();
  endServe = new ScheduleTimeService();


  endTimeUpdate: boolean = true;

  ngOnInit(): void {

    this.startTime.maxHour = 12;
    this.startTime.maxMinute = 59;
    this.startTime.minHour = 1;
    this.startTime.minMin = 0;
    this.startTime.timeHour = "08";
    this.startTime.timeMin = "00";
    this.startTime.meridiem = 0;


    this.endTime.maxHour = 12;
    this.endTime.maxMinute = 59;
    this.endTime.minHour = 1;
    this.endTime.minMin = 0;
    this.endTime.timeHour = "08";
    this.endTime.timeMin = "30";
    this.endTime.meridiem = 0;



    this.apptTime.maxHour = 24;
    this.apptTime.maxMinute = 89;
    this.apptTime.minHour = 0;
    this.apptTime.minMin = 0;
    this.apptTime.timeHour = "00";
    this.apptTime.timeMin = "30";
    this.apptTime.meridiem = 0;

    this.startServe.updateTime(this.startTime);
    this.apptServe.updateTime(this.apptTime);
    this.endServe.updateTime(this.endTime);

    this.startServe.inputedTime.subscribe((resp: TimeSelector) => {
      this.startTime = resp;
      this.endTimeUpdater();
      this.cdr.markForCheck()

    }
    )

    this.apptServe.inputedTime.subscribe(resp => {

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


  endTimeUpdater() {

    const startHour = this.parseNumber(this.startTime.timeHour);
    const startMeridium = (this.startTime.meridiem == 1 && startHour < 12) ? 12 : 0;
    const appTimes = ((startHour + startMeridium) * 60) +
      this.parseNumber(this.startTime.timeMin) +
      (this.parseNumber(this.apptTime.timeHour) * 60) +
      this.parseNumber(this.apptTime.timeMin);
    var _endHour = Math.floor(appTimes / 60);
    if (_endHour > 12) {

      _endHour = _endHour - 12;
      this.endTime.meridiem = 1;
    }

    const endMin = appTimes % 60;

    this.endTime.timeHour = this.convertNumber(_endHour);
    this.endTime.timeMin = this.convertNumber(endMin);
    this.endServe.updateTime(this.endTime);

  }

  apptTimeUpdater() {
    const startHour = this.parseNumber(this.startTime.timeHour);
    const endHour = this.parseNumber(this.endTime.timeHour);


    const startMeridium = (this.startTime.meridiem == 1 && startHour < 12) ? 12 : 0;

    const endMeridium = (this.endTime.meridiem == 1 && endHour < 12) ? 12 : 0;



    const startTime = ((startHour + startMeridium) * 60) +
      this.parseNumber(this.startTime.timeMin);

    const endTime = ((endHour + endMeridium) * 60) +
      this.parseNumber(this.endTime.timeMin);

    var _appTime = endTime - startTime;
    if (_appTime < 1) {

      this.apptTime.timeHour = this.convertNumber(0);
      this.apptTime.timeMin = this.convertNumber(1)

    }

    else {
      this.apptTime.timeHour = this.convertNumber(Math.floor(_appTime / 60));
      this.apptTime.timeMin = this.convertNumber(_appTime % 60);
    }

    this.endTimeUpdate = false;
    this.apptServe.updateTime(this.apptTime);

  }


  parseNumber(timeUnit: string): number {
    var unit = 0
    if (timeUnit.charAt(0) == "0") {
      timeUnit = timeUnit.substring(1)

    }
    if (Number(timeUnit)) {
      unit = Number(timeUnit)
    }
    return unit
  }

  convertNumber(unit: number): string {
    var stringUnit = unit.toString();
    if (stringUnit.length < 2) {
      stringUnit = "0" + stringUnit;
    }
    return stringUnit;
  }

}
