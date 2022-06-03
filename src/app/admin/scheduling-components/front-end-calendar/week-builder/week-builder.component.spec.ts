import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekBuilderComponent } from './week-builder.component';

describe('WeekBuilderComponent', () => {
  let component: WeekBuilderComponent;
  let fixture: ComponentFixture<WeekBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
