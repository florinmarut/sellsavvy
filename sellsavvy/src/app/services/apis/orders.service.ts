import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { CrudService } from '../crud.service';
import { QueryParams } from '../../models/config.model';
import { Observable } from 'rxjs';
import {
  OrderCreateDTO,
  OrderDTO,
  OrderUpdateDTO,
} from '../../models/dtos/order.model';
import { PagedData } from '../../models/dtos/paged.model';

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

  createOrdersList(
    orders: OrderCreateDTO[],
    params?: QueryParams
  ): Observable<any> {
    return this._crud.post(null, orders, `${this.ROUTE}/createmany`, params);
  }

  updateOrder(
    body: OrderUpdateDTO,
    params?: QueryParams
  ): Observable<any> {
    return this._crud.put(null, body, this.ROUTE, params);
  }

  deleteOrder(id: string, params?: QueryParams): Observable<any> {
    return this._crud.delete(id, this.ROUTE, params);
  }

  getPaged(
    pageNumber: number,
    pageSize: number,
    filters?: string,
    sort?: string,
    order?: string
  ): Observable<PagedData<OrderDTO>> {
    return this._crud.get(null, `${this.ROUTE}/paged`, {
      pageNumber: pageNumber,
      pageSize: pageSize,
      filters: filters,
      sort: sort,
      order: order,
    });
  }

  getOrdersByUserId(
    id: string,
    params?: QueryParams
  ): Observable<Array<OrderDTO>> {
    return this._crud.get(id, this.ROUTE + '/user', params);
  }
}
