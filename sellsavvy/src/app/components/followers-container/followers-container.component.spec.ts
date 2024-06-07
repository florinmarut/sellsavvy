import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersContainerComponent } from './followers-container.component';

describe('FollowersContainerComponent', () => {
  let component: FollowersContainerComponent;
  let fixture: ComponentFixture<FollowersContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowersContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FollowersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
