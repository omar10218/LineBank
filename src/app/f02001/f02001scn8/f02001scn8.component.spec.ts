import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001scn8Component } from './f02001scn8.component';

describe('F02001scn8Component', () => {
  let component: F02001scn8Component;
  let fixture: ComponentFixture<F02001scn8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001scn8Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001scn8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
