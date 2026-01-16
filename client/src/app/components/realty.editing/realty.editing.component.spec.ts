import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRealtiesComponent } from './realty.editing.component';

describe('EditRealtiesComponent', () => {
  let component: EditRealtiesComponent;
  let fixture: ComponentFixture<EditRealtiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRealtiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRealtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
