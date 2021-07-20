import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001scn4Component } from './f02001scn4.component';

describe('F02001scn4Component', () => {
  let component: F02001scn4Component;
  let fixture: ComponentFixture<F02001scn4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001scn4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001scn4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
