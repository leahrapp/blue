import { NgModule } from '@angular/core';
import { ReactiveFormsModule , FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";

import { MatExpansionModule } from "@angular/material/expansion";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { ScheduleManagerComponent } from './admin/schedule-manager/schedule-manager.component';

import { MinuteToHourPipe } from "src/pipes/minutes-to-clock.pipe";
import { FillArrayPipe } from "src/pipes/fill-array.pipe";


import { ScheduleBuilderComponent } from './admin/schedule-manager/schedule-builder/schedule-builder.component';
import { FrontEndCalendarComponent } from './admin/scheduling-components/front-end-calendar/front-end-calendar.component';
import { MatNativeDateModule } from '@angular/material/core';
import { TimeInputComponent } from './admin/scheduling-components/time-input/time-input.component';
import { TimeOrchestrationComponent } from './admin/scheduling-components/time-orchestration/time-orchestration.component';
import { MonthBuilderComponent } from './admin/scheduling-components/front-end-calendar/month-builder/month-builder.component';
import { WeekBuilderComponent } from './admin/scheduling-components/front-end-calendar/week-builder/week-builder.component';
import { DayBuilderComponent } from './admin/scheduling-components/front-end-calendar/day-builder/day-builder.component';
import { CalendarBuilderComponent } from './admin/scheduling-components/front-end-calendar/calendar-builder/calendar-builder.component';
import { TimeInputFormComponent } from './admin/scheduling-components/time-input-form/time-input-form.component';
import { TimeFormOrchestrationComponent } from './admin/scheduling-components/time-form-orchestration/time-form-orchestration.component';
import { DayScheduleComponent } from './admin/scheduling-components/day-schedule/day-schedule.component';

@NgModule({
  declarations: [
    MinuteToHourPipe,
    FillArrayPipe,
    AppComponent,
    AdminComponent,
    ScheduleManagerComponent,

    ScheduleBuilderComponent,
    FrontEndCalendarComponent,
    TimeInputComponent,
    TimeOrchestrationComponent,
    MonthBuilderComponent,
    WeekBuilderComponent,
    DayBuilderComponent,
    CalendarBuilderComponent,
    TimeInputFormComponent,
    TimeFormOrchestrationComponent,
    DayScheduleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    MatFormFieldModule,
    ReactiveFormsModule , FormsModule,
    MatButtonToggleModule, 
    MatInputModule,
    MatDatepickerModule,
    MatIconModule, 
    MatGridListModule,
    MatExpansionModule, 
    MatNativeDateModule,
    MatCardModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
