import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03005confirmComponent } from './f03005confirm.component';

describe('F03005confirmComponent', () => {
  let component: F03005confirmComponent;
  let fixture: ComponentFixture<F03005confirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03005confirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03005confirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
