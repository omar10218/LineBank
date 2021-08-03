import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn11page5Component } from './f01001scn11page5.component';

describe('F01001scn11page5Component', () => {
  let component: F01001scn11page5Component;
  let fixture: ComponentFixture<F01001scn11page5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn11page5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn11page5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
