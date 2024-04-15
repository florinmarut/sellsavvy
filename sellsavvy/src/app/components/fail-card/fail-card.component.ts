import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PageMessageService } from '../../services/data-share/page-message.service';

@Component({
  selector: 'fail-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './fail-card.component.html',
  styleUrl: './fail-card.component.scss',
})
export class FailCardComponent {
  @Input() title: string = this._message.failTitle;
  @Input() message: string = this._message.failMessage;

  constructor(private readonly _message: PageMessageService) {}
}
