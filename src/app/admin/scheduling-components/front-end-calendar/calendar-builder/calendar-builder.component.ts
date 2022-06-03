import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { CalendarBuilderService } from "src/app/admin/schedule-manager/services/calander-builder.service";

@Component({
  selector: 'app-calendar-builder',
  templateUrl: './calendar-builder.component.html',
  styleUrls: ['./calendar-builder.component.scss']
})
export class CalendarBuilderComponent implements OnInit {

  startDateRange: Date = new Date();
  endDateRange: Date = new Date(this.startDateRange.getFullYear(), this.startDateRange.getMonth(), this.getDaysInMonth(this.startDateRange.getFullYear(), this.startDateRange.getMonth()));

  constructor(private calService: CalendarBuilderService, private cdr: ChangeDetectorRef) { }
  dateArr: Date[];
  ngOnInit(): void {

    this.calService.dateRange.subscribe(range => {

      if (range != undefined) {
        this.startDateRange = range.startDateRange;
        this.endDateRange = range.endDateRange;

        this.updateMonths();
      }
      this.cdr.markForCheck();
    })
  }

  updateMonths() {
    this.dateArr = new Array<Date>();

    var month = this.startDateRange.getMonth();

    var endMonth = this.endDateRange.getMonth();

    if (endMonth < month) {
      endMonth += 12;

    }

    this.dateArr.push(this.startDateRange);
    for (var i = month + 1; i < endMonth; i++) {

      const nextDate = new Date(this.startDateRange.getFullYear(), i, 1)

      this.dateArr.push(nextDate);
    }
    this.dateArr.push(this.endDateRange);

  }


  getDaysInMonth(year: number, month: number): number {
    return new Date(year, month, 0).getDate();
  }

}
