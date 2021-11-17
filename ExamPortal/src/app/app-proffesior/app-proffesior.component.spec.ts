import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProffesiorComponent } from './app-proffesior.component';

describe('AppProffesiorComponent', () => {
  let component: AppProffesiorComponent;
  let fixture: ComponentFixture<AppProffesiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppProffesiorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppProffesiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
