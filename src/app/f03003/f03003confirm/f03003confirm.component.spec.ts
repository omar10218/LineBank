import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03003confirmComponent } from './f03003confirm.component';

describe('F03003confirmComponent', () => {
  let component: F03003confirmComponent;
  let fixture: ComponentFixture<F03003confirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03003confirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03003confirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
