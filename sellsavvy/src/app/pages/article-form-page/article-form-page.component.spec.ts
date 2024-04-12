import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFormPageComponent } from './article-form-page.component';

describe('ArticleFormPageComponent', () => {
  let component: ArticleFormPageComponent;
  let fixture: ComponentFixture<ArticleFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
