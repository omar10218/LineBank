import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001scn10Component } from './f02001scn10.component';

describe('F02001scn10Component', () => {
  let component: F02001scn10Component;
  let fixture: ComponentFixture<F02001scn10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001scn10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001scn10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
