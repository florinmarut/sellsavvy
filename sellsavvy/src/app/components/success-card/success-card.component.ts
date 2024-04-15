import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PageMessageService } from '../../services/data-share/page-message.service';

@Component({
  selector: 'success-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './success-card.component.html',
  styleUrl: './success-card.component.scss',
})
export class SuccessCardComponent {
  @Input() title: string = this._message.successTitle;
  @Input() message: string = this._message.successMessage;

  constructor(private readonly _message: PageMessageService) {}
}
