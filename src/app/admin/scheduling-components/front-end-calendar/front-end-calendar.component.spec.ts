import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndCalendarComponent } from './front-end-calendar.component';

describe('FrontEndCalendarComponent', () => {
  let component: FrontEndCalendarComponent;
  let fixture: ComponentFixture<FrontEndCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontEndCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontEndCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
