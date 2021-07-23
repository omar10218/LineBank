import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn12editComponent } from './f01001scn12edit.component';

describe('F01001scn12editComponent', () => {
  let component: F01001scn12editComponent;
  let fixture: ComponentFixture<F01001scn12editComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn12editComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn12editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
