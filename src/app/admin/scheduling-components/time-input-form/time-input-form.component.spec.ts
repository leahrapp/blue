import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeInputFormComponent } from './time-input-form.component';

describe('TimeInputFormComponent', () => {
  let component: TimeInputFormComponent;
  let fixture: ComponentFixture<TimeInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeInputFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
