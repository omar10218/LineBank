import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F04004Component } from './f04004.component';

describe('F04004Component', () => {
  let component: F04004Component;
  let fixture: ComponentFixture<F04004Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F04004Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F04004Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
