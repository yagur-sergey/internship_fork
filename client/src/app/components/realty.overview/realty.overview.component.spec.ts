import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRealtyComponent } from './realty.overview.component';

describe('OverviewRealtyComponent', () => {
  let component: OverviewRealtyComponent;
  let fixture: ComponentFixture<OverviewRealtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewRealtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewRealtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
