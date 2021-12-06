import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02007Component } from './f02007.component';

describe('F02007Component', () => {
  let component: F02007Component;
  let fixture: ComponentFixture<F02007Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02007Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02007Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
