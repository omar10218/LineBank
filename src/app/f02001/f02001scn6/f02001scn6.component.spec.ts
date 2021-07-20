import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001scn6Component } from './f02001scn6.component';

describe('F02001scn6Component', () => {
  let component: F02001scn6Component;
  let fixture: ComponentFixture<F02001scn6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001scn6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001scn6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
