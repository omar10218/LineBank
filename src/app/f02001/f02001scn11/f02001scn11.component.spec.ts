import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001scn11Component } from './f02001scn11.component';

describe('F02001scn11Component', () => {
  let component: F02001scn11Component;
  let fixture: ComponentFixture<F02001scn11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001scn11Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001scn11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
