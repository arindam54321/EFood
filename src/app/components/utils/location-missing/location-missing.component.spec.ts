import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMissingComponent } from './location-missing.component';

describe('LocationMissingComponent', () => {
  let component: LocationMissingComponent;
  let fixture: ComponentFixture<LocationMissingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationMissingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationMissingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
