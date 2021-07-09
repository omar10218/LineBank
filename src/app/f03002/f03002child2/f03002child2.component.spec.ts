import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03002child2Component } from './f03002child2.component';

describe('F03002child2Component', () => {
  let component: F03002child2Component;
  let fixture: ComponentFixture<F03002child2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03002child2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03002child2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
