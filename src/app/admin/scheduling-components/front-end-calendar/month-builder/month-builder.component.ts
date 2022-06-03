import { Component, OnInit, Input } from '@angular/core';
import * as _holidays from "src/holidays.json";
import { CalendarBuilderService } from "src/app/admin/schedule-manager/services/calander-builder.service";
import { DateRange } from "src/app/admin/models/date-select.model";
@Component({
  selector: 'app-month-builder',
  templateUrl: './month-builder.component.html',
  styleUrls: ['./month-builder.component.scss']
})
export class MonthBuilderComponent implements OnInit {

  @Input() date: Date

  month: string;
  year: string;

  weeks: DateRange[];
  constructor(private calService: CalendarBuilderService) { }

  ngOnInit(): void {

    const thisYear = this.date.getFullYear();
    const thisMonth = this.date.getMonth();
    this.month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(this.date);
    this.year = thisYear.toString();
    const startOfMOnth = new Date(thisYear, thisMonth, 1);
    const endOfMonth = new Date(thisYear, thisMonth, this.getDaysInMonth(thisYear, thisMonth));

    var weekCount = Math.floor((startOfMOnth.getDay() + this.getDaysInMonth(thisYear, thisMonth)) / 7);


    this.weeks = new Array<DateRange>();
    let startOfWeek = 1;
    let index = 0;




    if (startOfMOnth.getDay() > 0) {
      index = 1;
      //get days till end of week
      const endDayOfStartWeek = 6 - startOfMOnth.getDay();

      //add endDayofWeek to the start month date to get the last day of the week 
      const endOfStartWeek = startOfMOnth.getDate() + endDayOfStartWeek;

      const startWeek = new DateRange();
      startWeek.startDateRange = startOfMOnth;
  
      startWeek.endDateRange = new Date(startOfMOnth.getFullYear(), startOfMOnth.getMonth(), endOfStartWeek);
    

      this.weeks.push(startWeek)
     
//set start of next week 
      startOfWeek = endOfStartWeek + 1;
    }

    for (var i = index; i < weekCount; i++) {

      const nextWeek = new DateRange()
      nextWeek.startDateRange = new Date(thisYear, thisMonth, startOfWeek)
      nextWeek.endDateRange = new Date(thisYear, thisMonth, startOfWeek + 6);

      this.weeks.push(nextWeek);
     
      startOfWeek= startOfWeek+7; 


    }

    const lastWeek = new DateRange();

    lastWeek.startDateRange = new Date(thisYear, thisMonth, startOfWeek);
    lastWeek.endDateRange = new Date(thisYear, thisMonth,  this.getDaysInMonth(thisYear, thisMonth))


    this.weeks.push(lastWeek);


  }


  getDaysInMonth(year: number, month: number): number {
    const days =new Date(year, month+1, 0).getDate();

    return days; 
  }

  weekSelector() {



  }

}
