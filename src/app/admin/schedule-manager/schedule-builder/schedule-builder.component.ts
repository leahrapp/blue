import { Component, OnInit ,ChangeDetectorRef  } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { CalendarBuilderService } from "src/app/admin/schedule-manager/services/calander-builder.service";
import { DateSelect, DateRange } from "src/app/admin/models/date-select.model";
import { TimeSelector  } from "src/app/admin/models/time-selector.model";
import { ScheduleTimeService } from "src/app/admin/schedule-manager/services/schedule-time.service";
@Component({
  selector: 'app-schedule-builder',
  templateUrl: './schedule-builder.component.html',
  styleUrls: ['./schedule-builder.component.scss']
})
export class ScheduleBuilderComponent implements OnInit {

  constructor(private fb: FormBuilder, private calService: CalendarBuilderService, private cdr:ChangeDetectorRef ) { }
  selectMulipleDays: number[] = new Array<number>();
  dateRangeForm: FormGroup;
  startDay: Date = new Date();

  selectWeekDays: DateSelect = new DateSelect();

  dateRange: DateRange = new DateRange();


  maxDate: Date = new Date(this.startDay.getFullYear() + 1, this.startDay.getMonth(), this.startDay.getDate());

  endDay: Date = new Date(this.startDay.getFullYear(), this.startDay.getMonth(), this.startDay.getDate() + 90);


   startTime = new TimeSelector(); 
   apptTime = new TimeSelector(); 
   endTime= new TimeSelector(); 
   startServe = new ScheduleTimeService(); 
   apptServe = new ScheduleTimeService(); 
   endServe= new ScheduleTimeService(); 
  ngOnInit(): void {
    this.dateRangeForm = this.fb.group({
      startDate: [this.startDay],
      endDate: ['']
    })
    this.dateRangeForm.get('endDate')!.setValue(this.endDay);





   

  


  }

  updateStart(event: MatDatepickerInputEvent<Date>) {
    this.startDay = event.value ?? new Date();
    this.dateRange.startDateRange=event.value ?? new Date();
    this.calService.setDateRange(this.dateRange)
  }

  updateEnd(event: MatDatepickerInputEvent<Date>) {
    this.endDay = event.value ?? new Date();
    this.dateRange.endDateRange=event.value ?? new Date();
    this.calService.setDateRange(this.dateRange)
  }


  selectDays(day: number) {
    this.selectWeekDays.day = day;
    const dayIndex = this.selectMulipleDays.indexOf(day);
    if (dayIndex > -1) {
      this.selectMulipleDays.splice(dayIndex, 1);
      this.calService.unSelectDay(this.selectWeekDays);

    }
    else {

      this.selectMulipleDays.push(day);
      this.calService.selectDay(this.selectWeekDays);
    }
  }

  get startDate() {
    return this.dateRangeForm.get('startDate');
  }

  get endDate() {
    return this.dateRangeForm.get('endDate');

  }
  onSubmit() {



  }
}
