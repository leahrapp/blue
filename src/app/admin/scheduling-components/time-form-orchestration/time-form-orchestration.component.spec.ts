import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFormOrchestrationComponent } from './time-form-orchestration.component';

describe('TimeFormOrchestrationComponent', () => {
  let component: TimeFormOrchestrationComponent;
  let fixture: ComponentFixture<TimeFormOrchestrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeFormOrchestrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeFormOrchestrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
