import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewKartComponent } from './view-kart.component';

describe('ViewKartComponent', () => {
  let component: ViewKartComponent;
  let fixture: ComponentFixture<ViewKartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewKartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewKartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
