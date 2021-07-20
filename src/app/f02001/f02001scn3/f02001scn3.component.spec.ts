import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001scn3Component } from './f02001scn3.component';

describe('F02001scn3Component', () => {
  let component: F02001scn3Component;
  let fixture: ComponentFixture<F02001scn3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001scn3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001scn3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
