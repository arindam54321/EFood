import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantLandingPageComponent } from './restaurant-landing-page.component';

describe('RestaurantLandingPageComponent', () => {
  let component: RestaurantLandingPageComponent;
  let fixture: ComponentFixture<RestaurantLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
