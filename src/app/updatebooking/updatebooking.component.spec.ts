import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatebookingComponent } from './updatebooking.component';

describe('UpdatebookingComponent', () => {
  let component: UpdatebookingComponent;
  let fixture: ComponentFixture<UpdatebookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatebookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
