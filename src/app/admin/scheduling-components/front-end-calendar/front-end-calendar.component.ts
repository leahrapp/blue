import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import * as _holidays from "src/holidays.json";
import { Holidays } from '../../models/holidays.interface';
import { FrontEndDayModel, FrontEndMonthModel } from "src/app/admin/models/front-end-calendar.model";
import { CalendarBuilderService } from "src/app/admin/schedule-manager/services/calander-builder.service";

@Component({
  selector: 'app-front-end-calendar',
  templateUrl: './front-end-calendar.component.html',
  styleUrls: ['./front-end-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class FrontEndCalendarComponent implements OnInit {

  months: Array<FrontEndMonthModel> = new Array<FrontEndMonthModel>();
  days: Array<FrontEndDayModel> = new Array<FrontEndDayModel>();

  holidays: Array<Holidays> = (_holidays as any).default;
  holidaySet: Map<string, string> = new Map<string, string>();
  startDateRange: Date = new Date();
  endDateRange: Date = new Date();
  selectedWeekDay: Array<number> = new Array<number>();
  calendar: boolean = false;

  constructor(private calService: CalendarBuilderService, private cdk: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.getHolidays();

    this.calService.selectedDay.subscribe(dayOfWeek => {
      if (dayOfWeek.day != undefined)
        this.months.forEach(day => {
          day.days.forEach(weekDay => {

            if (dayOfWeek.day == weekDay.day && !weekDay.restricted) {

              weekDay.daySelected = true;
              weekDay.colSelected = true;
              this.selectedWeekDay.push(dayOfWeek.day);
            }

          })
        })
      this.cdk.markForCheck();

    }
    )

    this.calService.unselectedDay.subscribe(dayOfWeek => {
      if (dayOfWeek.day != undefined)

        this.months.forEach(day => {
          day.days.forEach(weekDay => {
            if (dayOfWeek.day == weekDay.day && !weekDay.restricted) {

              weekDay.daySelected = false;
              weekDay.colSelected = false;

              const dayIndex = this.selectedWeekDay.indexOf(dayOfWeek.day);
              if (dayIndex > -1) {
                this.selectedWeekDay.splice(dayIndex, 1);
              }
            }
          })
        })

      this.cdk.markForCheck();
    })

    this.calService.dateRange.subscribe((range) => {

      if (range != undefined) {
        this.endDateRange = range.endDateRange;
        this.startDateRange = range.startDateRange;
      }
      this.getHolidays();
      this.tryingMyBestOk();
      this.cdk.markForCheck()
    });
  }



  tryingMyBestOk() {
    var tempMonths = new Array<FrontEndMonthModel>();
    if(this.months.length>0){
    tempMonths = this.months;
    this.months = new Array<FrontEndMonthModel>();
}

    const startMonth = new Date(this.startDateRange.getFullYear(), this.startDateRange.getMonth(), 1);
    const endMonth = new Date(this.endDateRange.getFullYear(), this.endDateRange.getMonth(), this.getDaysInMonth(this.endDateRange.getFullYear(), this.endDateRange.getMonth())); 


    var indexDate = startMonth;
    var month = new FrontEndMonthModel();
    month.month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(indexDate);
    month.year = indexDate.getFullYear().toString();
    var dayArr = new Array<FrontEndDayModel>();
    if (indexDate.getDay() > 0) {

      for (var i = indexDate.getDay(); i >= 0; i--) {

        const blankDay = {} as FrontEndDayModel;
        blankDay.restricted = true;
        dayArr.push(blankDay);
      }
    }
    var tempMonth = indexDate.getMonth();
    while (indexDate < endMonth) {
      if (tempMonth != indexDate.getMonth()) {

        month.days = dayArr;
        this.months.push(month);

        month = new FrontEndMonthModel();
        month.month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(indexDate);
        month.year = indexDate.getFullYear().toString();
        dayArr = new Array<FrontEndDayModel>();
        if (indexDate.getDay() > 0) {

          for (var i = indexDate.getDay() - 1; i >= 0; i--) {

            const blankDay = {} as FrontEndDayModel;
            blankDay.restricted = true;
            dayArr.push(blankDay);
          }
        }

      }

      const newDay = {} as FrontEndDayModel;
      newDay.date = indexDate.getDate().toString();
      newDay.fullDate= new Date(indexDate.getFullYear(), indexDate.getMonth(), indexDate.getDate()); 
      newDay.restricted = false;
      newDay.day = indexDate.getDay();
      newDay.daySelected = false;
      newDay.colSelected = false;
    
      dayArr.push(newDay);
      tempMonth = indexDate.getMonth();
      indexDate.setDate(indexDate.getDate() + 1);
    }

    month.days = dayArr;
    this.months.push(month);

    this.months.forEach(month => {
      tempMonths.forEach(temp => {
        if (month.year == temp.year && month.month == temp.month)
          month.days.forEach(day => {
            this.selectedWeekDay.forEach(idk => {

              if (idk == day.day && !day.restricted) {

                day.colSelected = true;
                day.daySelected = true;
              }
            })
            temp.days.forEach(tempDay => {

              if (day.date == tempDay.date) {

                if (tempDay.daySelected || tempDay.colSelected) {
                  day.daySelected = tempDay.daySelected;
                  day.colSelected = tempDay.colSelected;
                }
              }

            })
          })
      })
    })


    this.calendar = true;


  }
  daySelector(monthInd: number, dayInd: number) {

    if (!this.months[monthInd].days[dayInd].daySelected) {

      this.months[monthInd].days[dayInd].daySelected = true;
   

    }
    else {
      this.months[monthInd].days[dayInd].daySelected = false;
    
    }
  }
  weekSelector(monthInd: number, week: number) {

    this.months[monthInd].days.forEach(weekDay => {
      if (weekDay.day == week) {
        if (weekDay.colSelected) {

          weekDay.colSelected = false;
          weekDay.daySelected = false;
       
        }
        else {
          weekDay.colSelected = true;
          weekDay.daySelected = true;
        

        }
      }
    })

  }
  clearDays() {
    this.months.forEach(month => {

      month.days.forEach(day => {

if(!day.restricted){
        day.daySelected = false;
        day.colSelected = false;
    
}
      })
    })
  }
  getHolidays() {

    this.holidays.forEach(year => {
      year.holidays.forEach(hol => {
        var holDate = new Date(year.year, hol.month, hol.day);

        if (holDate >= this.startDateRange && holDate <= this.endDateRange) {

          this.holidaySet.set(holDate.toDateString(), hol.holiday);
        }
      })
    })
  }

  
  getDaysInMonth(year: number, month: number): number {
    const days =new Date(year, month+1, 0).getDate();

    return days; 
  }

  getClass(day: FrontEndDayModel): string {
    if (!day.restricted) {
  
      if (day.fullDate < this.startDateRange || day.fullDate > this.endDateRange) {
        return "inactive-day";
      }
      if (this.holidaySet.has(day.fullDate.toDateString())) {
        if (day.daySelected || day.colSelected) {
          return "holiday-day-selected";
        }
        else {
          return "holiday-day"
        }
      }
      else {

        if (day.daySelected || day.colSelected) {
          return "normal-day-selected"
        }
        else {
          return "normal-day"
        }
      }
    }
    return "empty-day";
  }
}
