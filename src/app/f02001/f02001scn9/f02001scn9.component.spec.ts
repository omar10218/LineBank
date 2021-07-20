import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001scn9Component } from './f02001scn9.component';

describe('F02001scn9Component', () => {
  let component: F02001scn9Component;
  let fixture: ComponentFixture<F02001scn9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001scn9Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001scn9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
