import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn12deleteComponent } from './f01001scn12delete.component';

describe('F01001scn12deleteComponent', () => {
  let component: F01001scn12deleteComponent;
  let fixture: ComponentFixture<F01001scn12deleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn12deleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn12deleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
