import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03002Component } from './f03002.component';

describe('F03002Component', () => {
  let component: F03002Component;
  let fixture: ComponentFixture<F03002Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03002Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03002Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
