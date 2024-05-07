import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {}
