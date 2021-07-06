import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03005editComponent } from './f03005edit.component';

describe('F03005editComponent', () => {
  let component: F03005editComponent;
  let fixture: ComponentFixture<F03005editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03005editComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03005editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
