import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03014addComponent } from './f03014add.component';

describe('F03014addComponent', () => {
  let component: F03014addComponent;
  let fixture: ComponentFixture<F03014addComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03014addComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03014addComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
