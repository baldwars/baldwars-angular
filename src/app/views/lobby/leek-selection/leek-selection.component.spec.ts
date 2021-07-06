import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeekSelectionComponent } from './leek-selection.component';

describe('LeekSelectionComponent', () => {
  let component: LeekSelectionComponent;
  let fixture: ComponentFixture<LeekSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeekSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeekSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
