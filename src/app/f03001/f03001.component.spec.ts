import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03001Component } from './f03001.component';

describe('F03001Component', () => {
  let component: F03001Component;
  let fixture: ComponentFixture<F03001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03001Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
