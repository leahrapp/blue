import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOrchestrationComponent } from './time-orchestration.component';

describe('TimeOrchestrationComponent', () => {
  let component: TimeOrchestrationComponent;
  let fixture: ComponentFixture<TimeOrchestrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeOrchestrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOrchestrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
