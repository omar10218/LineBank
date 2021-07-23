import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn12confirmComponent } from './f01001scn12confirm.component';

describe('F01001scn12confirmComponent', () => {
  let component: F01001scn12confirmComponent;
  let fixture: ComponentFixture<F01001scn12confirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn12confirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn12confirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
