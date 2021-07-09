import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03002child202Component } from './f03002child202.component';

describe('F03002child202Component', () => {
  let component: F03002child202Component;
  let fixture: ComponentFixture<F03002child202Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03002child202Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03002child202Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
