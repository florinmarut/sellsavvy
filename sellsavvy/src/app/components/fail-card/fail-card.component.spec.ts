import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailCardComponent } from './fail-card.component';

describe('FailCardComponent', () => {
  let component: FailCardComponent;
  let fixture: ComponentFixture<FailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
