import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AddressDTO } from '../../models/dtos/address.model';
import { CountriesMap, StatesMap } from '../../models/constants.const';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'address',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  @Input() address!: AddressDTO;
  @Output() delete = new EventEmitter<AddressDTO>();
  countries = CountriesMap;
  states = StatesMap;

  constructor(private readonly _router: Router) {}

  edit() {
    this._router.navigate([`update-address/${this.address.id}`]);
  }
  onDelete() {
    this.delete.emit(this.address);
  }
}
