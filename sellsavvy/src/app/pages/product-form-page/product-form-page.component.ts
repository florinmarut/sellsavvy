import { Component } from '@angular/core';
import { ProductFormComponent } from '../../forms/product-form/product-form.component';

@Component({
  selector: 'product-form-page',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product-form-page.component.html',
  styleUrl: './product-form-page.component.scss'
})
export class ProductFormPageComponent {

}
