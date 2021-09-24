import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbartemplatesComponent } from './navbartemplates.component';

describe('NavbartemplatesComponent', () => {
  let component: NavbartemplatesComponent;
  let fixture: ComponentFixture<NavbartemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbartemplatesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbartemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
