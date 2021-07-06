import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03006confirmComponent } from './f03006confirm.component';

describe('F03006confirmComponent', () => {
  let component: F03006confirmComponent;
  let fixture: ComponentFixture<F03006confirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03006confirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03006confirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
