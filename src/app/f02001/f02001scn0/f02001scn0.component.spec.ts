import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001scn0Component } from './f02001scn0.component';

describe('F02001scn0Component', () => {
  let component: F02001scn0Component;
  let fixture: ComponentFixture<F02001scn0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001scn0Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001scn0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
