import { ComponentFixture, TestBed } from '@angular/core/testing';

import { F03007confirmComponent } from './f03007confirm.component';

describe('F03007confirmComponent', () => {
  let component: F03007confirmComponent;
  let fixture: ComponentFixture<F03007confirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ F03007confirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(F03007confirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
