import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtiesAllListComponent } from './realties.all.list.component';

describe('RealtiesAllListComponent', () => {
  let component: RealtiesAllListComponent;
  let fixture: ComponentFixture<RealtiesAllListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtiesAllListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtiesAllListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
