import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03006addComponent } from './f03006add.component';

describe('F03006addComponent', () => {
  let component: F03006addComponent;
  let fixture: ComponentFixture<F03006addComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03006addComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03006addComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
