import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRealtiesComponent } from './realties.my.list.component';

describe('MyRealtiesComponent', () => {
  let component: MyRealtiesComponent;
  let fixture: ComponentFixture<MyRealtiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRealtiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRealtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
