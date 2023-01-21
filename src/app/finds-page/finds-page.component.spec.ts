import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindsPageComponent } from './finds-page.component';

describe('FindsPageComponent', () => {
  let component: FindsPageComponent;
  let fixture: ComponentFixture<FindsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
