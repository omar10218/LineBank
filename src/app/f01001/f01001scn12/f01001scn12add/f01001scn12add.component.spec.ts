import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F01001scn12addComponent } from './f01001scn12add.component';

describe('F01001scn12addComponent', () => {
  let component: F01001scn12addComponent;
  let fixture: ComponentFixture<F01001scn12addComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F01001scn12addComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F01001scn12addComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
