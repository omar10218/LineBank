import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn10page1Component } from './f01001scn10page1.component';

describe('F01001scn10page1Component', () => {
  let component: F01001scn10page1Component;
  let fixture: ComponentFixture<F01001scn10page1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn10page1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn10page1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
