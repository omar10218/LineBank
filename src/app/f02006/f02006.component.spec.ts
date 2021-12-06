import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F02006Component } from './f02006.component';

describe('F02006Component', () => {
  let component: F02006Component;
  let fixture: ComponentFixture<F02006Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F02006Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F02006Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
