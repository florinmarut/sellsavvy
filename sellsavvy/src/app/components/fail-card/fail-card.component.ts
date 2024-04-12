import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'fail-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './fail-card.component.html',
  styleUrl: './fail-card.component.scss',
})
export class FailCardComponent {
  @Input() title: string = 'Fail';
  @Input() message: string = 'Operation failed';
}
