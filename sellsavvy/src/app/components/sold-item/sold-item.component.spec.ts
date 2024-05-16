import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldItemComponent } from './sold-item.component';

describe('SoldItemComponent', () => {
  let component: SoldItemComponent;
  let fixture: ComponentFixture<SoldItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoldItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoldItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
