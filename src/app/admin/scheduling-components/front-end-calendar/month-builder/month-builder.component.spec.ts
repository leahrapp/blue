import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthBuilderComponent } from './month-builder.component';

describe('MonthBuilderComponent', () => {
  let component: MonthBuilderComponent;
  let fixture: ComponentFixture<MonthBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
