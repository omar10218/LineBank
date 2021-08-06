import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn10page2Component } from './f01001scn10page2.component';

describe('F01001scn10page2Component', () => {
  let component: F01001scn10page2Component;
  let fixture: ComponentFixture<F01001scn10page2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn10page2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn10page2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
