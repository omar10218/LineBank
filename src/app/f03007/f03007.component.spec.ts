import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03007Component } from './f03007.component';

describe('F03007Component', () => {
  let component: F03007Component;
  let fixture: ComponentFixture<F03007Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03007Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03007Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
