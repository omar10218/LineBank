import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001scn2Component } from './f02001scn2.component';

describe('F02001scn2Component', () => {
  let component: F02001scn2Component;
  let fixture: ComponentFixture<F02001scn2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001scn2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001scn2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
