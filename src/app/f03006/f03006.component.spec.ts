import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03006Component } from './f03006.component';

describe('F03006Component', () => {
  let component: F03006Component;
  let fixture: ComponentFixture<F03006Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03006Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03006Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
