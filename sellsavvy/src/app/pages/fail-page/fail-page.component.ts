import { Component } from '@angular/core';
import { FailCardComponent } from '../../components/fail-card/fail-card.component';

@Component({
  selector: 'fail-page',
  standalone: true,
  imports: [FailCardComponent],
  templateUrl: './fail-page.component.html',
  styleUrl: './fail-page.component.scss'
})
export class FailPageComponent {

}
