import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03005addComponent } from './f03005add.component';

describe('F03005addComponent', () => {
  let component: F03005addComponent;
  let fixture: ComponentFixture<F03005addComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03005addComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03005addComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
