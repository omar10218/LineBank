import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03006roleComponent } from './f03006role.component';

describe('F03006roleComponent', () => {
  let component: F03006roleComponent;
  let fixture: ComponentFixture<F03006roleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03006roleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03006roleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
