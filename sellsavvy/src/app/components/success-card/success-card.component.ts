import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'success-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './success-card.component.html',
  styleUrl: './success-card.component.scss',
})
export class SuccessCardComponent {
  @Input() title: string = 'Success';
  @Input() message: string = 'Operation was executed successfully';
}
