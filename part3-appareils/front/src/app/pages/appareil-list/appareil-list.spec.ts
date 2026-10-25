import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppareilList } from './appareil-list';

describe('AppareilList', () => {
  let component: AppareilList;
  let fixture: ComponentFixture<AppareilList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppareilList],
    }).compileComponents();

    fixture = TestBed.createComponent(AppareilList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
