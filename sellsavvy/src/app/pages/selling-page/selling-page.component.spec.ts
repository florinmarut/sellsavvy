import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellingPageComponent } from './selling-page.component';

describe('SellingPageComponent', () => {
  let component: SellingPageComponent;
  let fixture: ComponentFixture<SellingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
