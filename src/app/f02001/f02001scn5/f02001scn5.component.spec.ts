import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02001scn5Component } from './f02001scn5.component';

describe('F02001scn5Component', () => {
  let component: F02001scn5Component;
  let fixture: ComponentFixture<F02001scn5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02001scn5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02001scn5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
