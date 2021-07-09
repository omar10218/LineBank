import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03002child201Component } from './f03002child201.component';

describe('F03002child201Component', () => {
  let component: F03002child201Component;
  let fixture: ComponentFixture<F03002child201Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03002child201Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03002child201Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
