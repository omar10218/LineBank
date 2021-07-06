import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03006editComponent } from './f03006edit.component';

describe('F03006editComponent', () => {
  let component: F03006editComponent;
  let fixture: ComponentFixture<F03006editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03006editComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03006editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
