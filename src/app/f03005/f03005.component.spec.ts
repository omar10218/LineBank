import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03005Component } from './f03005.component';

describe('F03005Component', () => {
  let component: F03005Component;
  let fixture: ComponentFixture<F03005Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03005Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03005Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
