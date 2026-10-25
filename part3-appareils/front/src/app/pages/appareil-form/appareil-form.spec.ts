import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppareilForm } from './appareil-form';

describe('AppareilForm', () => {
  let component: AppareilForm;
  let fixture: ComponentFixture<AppareilForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppareilForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AppareilForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
