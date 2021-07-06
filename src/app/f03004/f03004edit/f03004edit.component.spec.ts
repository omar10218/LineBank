import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03004editComponent } from './f03004edit.component';

describe('F03004editComponent', () => {
  let component: F03004editComponent;
  let fixture: ComponentFixture<F03004editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03004editComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03004editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
