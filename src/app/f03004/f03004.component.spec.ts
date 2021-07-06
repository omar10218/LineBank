import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03004Component } from './f03004.component';

describe('F03004Component', () => {
  let component: F03004Component;
  let fixture: ComponentFixture<F03004Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03004Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03004Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
