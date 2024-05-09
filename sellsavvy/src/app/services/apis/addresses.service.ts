import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { CrudService } from '../crud.service';
import { Observable } from 'rxjs';
import {
  AddressCreateDTO,
  AddressDTO,
  AddressUpdateDTO,
} from '../../models/dtos/address.model';
import { QueryParams } from '../../models/config.model';
import { PagedData } from '../../models/dtos/paged.model';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  private readonly ROUTE = this._config.getConfig().addresses['addresses'];

  constructor(
    private readonly _config: ConfigService,
    private readonly _crud: CrudService
  ) {}

  getAddresses(params?: QueryParams): Observable<Array<AddressDTO>> {
    return this._crud.get(null, this.ROUTE, params);
  }

  getAddress(id: string, params?: QueryParams): Observable<AddressDTO> {
    return this._crud.get(id, this.ROUTE, params);
  }

  createAddress(body: AddressCreateDTO, params?: QueryParams): Observable<any> {
    return this._crud.post(null, body, this.ROUTE, params);
  }

  updateAddress(body: AddressUpdateDTO, params?: QueryParams): Observable<any> {
    return this._crud.put(null, body, this.ROUTE, params);
  }

  deleteAddress(id: string, params?: QueryParams): Observable<any> {
    return this._crud.delete(id, this.ROUTE, params);
  }

  getPaged(
    pageNumber: number,
    pageSize: number,
    filters?: string,
    sort?: string,
    order?: string
  ): Observable<PagedData<AddressDTO>> {
    return this._crud.get(null, `${this.ROUTE}/paged`, {
      pageNumber: pageNumber,
      pageSize: pageSize,
      filters: filters,
      sort: sort,
      order: order,
    });
  }
}
