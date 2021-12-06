import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02005Component } from './f02005.component';

describe('F02005Component', () => {
  let component: F02005Component;
  let fixture: ComponentFixture<F02005Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02005Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02005Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
