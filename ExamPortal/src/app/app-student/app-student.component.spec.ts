import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStudentComponent } from './app-student.component';

describe('AppStudentComponent', () => {
  let component: AppStudentComponent;
  let fixture: ComponentFixture<AppStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
