import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNoDataComponent } from './customer-no-data.component';

describe('CustomerNoDataComponent', () => {
  let component: CustomerNoDataComponent;
  let fixture: ComponentFixture<CustomerNoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerNoDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
