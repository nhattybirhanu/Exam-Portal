import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProffesiorExamCreatorComponent } from './proffesior-exam-creator.component';

describe('ProffesiorExamCreatorComponent', () => {
  let component: ProffesiorExamCreatorComponent;
  let fixture: ComponentFixture<ProffesiorExamCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProffesiorExamCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProffesiorExamCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
