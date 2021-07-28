import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptNameDialogComponent } from './script-name-dialog.component';

describe('ScriptNameDialogComponent', () => {
  let component: ScriptNameDialogComponent;
  let fixture: ComponentFixture<ScriptNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScriptNameDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
