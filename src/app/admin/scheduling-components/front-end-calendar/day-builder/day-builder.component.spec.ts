import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayBuilderComponent } from './day-builder.component';

describe('DayBuilderComponent', () => {
  let component: DayBuilderComponent;
  let fixture: ComponentFixture<DayBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
