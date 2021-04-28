import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsAndSubjectsComponent } from './programs-and-subjects.component';

describe('ProgramsAndSubjectsComponent', () => {
  let component: ProgramsAndSubjectsComponent;
  let fixture: ComponentFixture<ProgramsAndSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramsAndSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsAndSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
