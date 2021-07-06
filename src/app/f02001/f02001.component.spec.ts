import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001Component } from './f02001.component';

describe('F02001Component', () => {
  let component: F02001Component;
  let fixture: ComponentFixture<F02001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
