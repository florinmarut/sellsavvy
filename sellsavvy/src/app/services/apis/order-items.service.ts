import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { CrudService } from '../crud.service';
import { QueryParams } from '../../models/config.model';
import { Observable } from 'rxjs';
import {
  OrderItemCreateDTO,
  OrderItemDTO,
  OrderItemUpdateDTO,
} from '../../models/dtos/order-item.model';

@Injectable({
  providedIn: 'root',
})
export class OrderItemsService {
  private readonly ROUTE = this._config.getConfig().addresses['orderItems'];

  constructor(
    private readonly _config: ConfigService,
    private readonly _crud: CrudService
  ) {}

  getOrderItems(params?: QueryParams): Observable<Array<OrderItemDTO>> {
    return this._crud.get(null, this.ROUTE, params);
  }

  getOrderItem(id: string, params?: QueryParams): Observable<OrderItemDTO> {
    return this._crud.get(id, this.ROUTE, params);
  }

  createOrderItem(
    body: OrderItemCreateDTO,
    params?: QueryParams
  ): Observable<any> {
    return this._crud.post(null, body, this.ROUTE, params);
  }

  updateOrderItem(
    id: string,
    body: OrderItemUpdateDTO,
    params?: QueryParams
  ): Observable<any> {
    return this._crud.put(id, body, this.ROUTE, params);
  }

  deleteOrderItem(id: string, params?: QueryParams): Observable<any> {
    return this._crud.delete(id, this.ROUTE, params);
  }
}
