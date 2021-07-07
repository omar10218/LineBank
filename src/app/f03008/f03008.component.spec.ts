import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03008Component } from './f03008.component';

describe('F03008Component', () => {
  let component: F03008Component;
  let fixture: ComponentFixture<F03008Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03008Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03008Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
