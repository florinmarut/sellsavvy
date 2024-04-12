import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/apis/articles.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SuccessCardComponent } from '../../components/success-card/success-card.component';
import { FailCardComponent } from '../../components/fail-card/fail-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'article-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SuccessCardComponent,
    FailCardComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
})
export class ArticleFormComponent implements OnInit {
  articleForm!: FormGroup;
  constructor(
    private readonly _articlesService: ArticlesService,
    private readonly _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.articleForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required]],
      stock: [1, [Validators.required]],
    });
  }

  onSubmit() {
    const article = this.articleForm.value;

    // get the Id of the current user, refactor code below to include two observables with switchMap

    this._articlesService.createArticle(article).subscribe({
      next: (value) => {},
      error: (err) => {
        console.warn(err);
      },
    });
  }
}
