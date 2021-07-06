import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03004confirmComponent } from './f03004confirm.component';

describe('F03004confirmComponent', () => {
  let component: F03004confirmComponent;
  let fixture: ComponentFixture<F03004confirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03004confirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03004confirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
