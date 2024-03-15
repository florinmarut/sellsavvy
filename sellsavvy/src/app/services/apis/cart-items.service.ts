import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { CrudService } from '../crud.service';
import { QueryParams } from '../../models/config.model';
import { Observable } from 'rxjs';
import {
  CartItemCreateDTO,
  CartItemDTO,
  CartItemUpdateDTO,
} from '../../models/dtos/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartItemsService {
  private readonly ROUTE = this._config.getConfig().addresses['cartItems'];

  constructor(
    private readonly _config: ConfigService,
    private readonly _crud: CrudService
  ) {}

  getCartItems(params?: QueryParams): Observable<Array<CartItemDTO>> {
    return this._crud.get(null, this.ROUTE, params);
  }

  getCartItem(id: string, params?: QueryParams): Observable<CartItemDTO> {
    return this._crud.get(id, this.ROUTE, params);
  }

  createCartItem(
    body: CartItemCreateDTO,
    params?: QueryParams
  ): Observable<any> {
    return this._crud.post(null, body, this.ROUTE, params);
  }

  updateCartItem(
    id: string,
    body: CartItemUpdateDTO,
    params?: QueryParams
  ): Observable<any> {
    return this._crud.put(id, body, this.ROUTE, params);
  }

  deleteCartItem(id: string, params?: QueryParams): Observable<any> {
    return this._crud.delete(id, this.ROUTE, params);
  }

  getCartItemsByUserId(
    id: string,
    params?: QueryParams
  ): Observable<Array<CartItemDTO>> {
    return this._crud.get(id, this.ROUTE + '/user', params);
  }
}
