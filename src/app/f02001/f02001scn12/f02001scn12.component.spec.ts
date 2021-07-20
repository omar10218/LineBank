import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001scn12Component } from './f02001scn12.component';

describe('F02001scn12Component', () => {
  let component: F02001scn12Component;
  let fixture: ComponentFixture<F02001scn12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001scn12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001scn12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
