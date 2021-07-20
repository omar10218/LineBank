import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001scn7Component } from './f02001scn7.component';

describe('F02001scn7Component', () => {
  let component: F02001scn7Component;
  let fixture: ComponentFixture<F02001scn7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001scn7Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001scn7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
