import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { CrudService } from '../crud.service';
import { QueryParams } from '../../models/config.model';
import { Observable } from 'rxjs';
import {
  OrderCreateDTO,
  OrderDTO,
  OrderUpdateDTO,
} from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly ROUTE = this._config.getConfig().addresses['orders'];

  constructor(
    private readonly _config: ConfigService,
    private readonly _crud: CrudService
  ) {}

  getOrders(params?: QueryParams): Observable<Array<OrderDTO>> {
    return this._crud.get(null, this.ROUTE, params);
  }

  getOrder(id: string, params?: QueryParams): Observable<OrderDTO> {
    return this._crud.get(id, this.ROUTE, params);
  }

  createOrder(body: OrderCreateDTO, params?: QueryParams): Observable<any> {
    return this._crud.post(null, body, this.ROUTE, params);
  }

  updateOrder(
    id: string,
    body: OrderUpdateDTO,
    params?: QueryParams
  ): Observable<any> {
    return this._crud.put(id, body, this.ROUTE, params);
  }

  deleteOrder(id: string, params?: QueryParams): Observable<any> {
    return this._crud.delete(id, this.ROUTE, params);
  }
}
