import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRideDriverComponent } from './create-ride-driver.component';

describe('CreateRideDriverComponent', () => {
  let component: CreateRideDriverComponent;
  let fixture: ComponentFixture<CreateRideDriverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRideDriverComponent],
    });
    fixture = TestBed.createComponent(CreateRideDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
