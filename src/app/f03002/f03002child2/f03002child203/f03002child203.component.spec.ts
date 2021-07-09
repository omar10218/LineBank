import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03002child203Component } from './f03002child203.component';

describe('F03002child203Component', () => {
  let component: F03002child203Component;
  let fixture: ComponentFixture<F03002child203Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03002child203Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03002child203Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
