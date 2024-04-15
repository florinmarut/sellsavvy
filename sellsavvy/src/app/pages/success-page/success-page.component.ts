import { Component } from '@angular/core';
import { SuccessCardComponent } from '../../components/success-card/success-card.component';

@Component({
  selector: 'success-page',
  standalone: true,
  imports: [SuccessCardComponent],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.scss',
})
export class SuccessPageComponent {}
