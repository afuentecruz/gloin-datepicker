import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GloinDatepickerComponent } from './gloin-datepicker.component';

describe('GloinDatepickerComponent', () => {
  let component: GloinDatepickerComponent;
  let fixture: ComponentFixture<GloinDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GloinDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GloinDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
