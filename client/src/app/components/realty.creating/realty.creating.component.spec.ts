import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtyCreatingComponent } from './realty.creating.component';

describe('RealtyCreatingComponent', () => {
  let component: RealtyCreatingComponent;
  let fixture: ComponentFixture<RealtyCreatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtyCreatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtyCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});