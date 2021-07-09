import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03002child1Component } from './f03002child1.component';

describe('F03002child1Component', () => {
  let component: F03002child1Component;
  let fixture: ComponentFixture<F03002child1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03002child1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03002child1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
