import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03004addComponent } from './f03004add.component';

describe('F03004addComponent', () => {
  let component: F03004addComponent;
  let fixture: ComponentFixture<F03004addComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03004addComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03004addComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
