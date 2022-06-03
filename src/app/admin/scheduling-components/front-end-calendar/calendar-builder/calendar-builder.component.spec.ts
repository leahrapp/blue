import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarBuilderComponent } from './calendar-builder.component';

describe('CalendarBuilderComponent', () => {
  let component: CalendarBuilderComponent;
  let fixture: ComponentFixture<CalendarBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
