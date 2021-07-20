import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001scn1Component } from './f02001scn1.component';

describe('F02001scn1Component', () => {
  let component: F02001scn1Component;
  let fixture: ComponentFixture<F02001scn1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001scn1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001scn1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
