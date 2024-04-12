import { Component } from '@angular/core';
import { ArticleFormComponent } from '../../forms/article-form/article-form.component';

@Component({
  selector: 'article-form-page',
  standalone: true,
  imports: [ArticleFormComponent],
  templateUrl: './article-form-page.component.html',
  styleUrl: './article-form-page.component.scss'
})
export class ArticleFormPageComponent {

}
