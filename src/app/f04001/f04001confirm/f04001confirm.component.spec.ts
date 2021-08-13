import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F04001confirmComponent } from './f04001confirm.component';

describe('F04001confirmComponent', () => {
  let component: F04001confirmComponent;
  let fixture: ComponentFixture<F04001confirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F04001confirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F04001confirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
