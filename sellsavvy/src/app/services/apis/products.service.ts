import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';
import { ConfigService } from '../config.service';
import { QueryParams } from '../../models/config.model';
import {
  ProductCreateDTO,
  ProductDTO,
  ProductUpdateDTO,
} from '../../models/dtos/product.model';
import { Observable } from 'rxjs';
import { PagedData } from '../../models/dtos/paged.model';

@Injectable({
  providedIn: 'root',
})
export class productsService {
  private readonly ROUTE = this._config.getConfig().addresses['products'];

  constructor(
    private readonly _config: ConfigService,
    private readonly _crud: CrudService
  ) {}

  getproducts(params?: QueryParams): Observable<Array<ProductDTO>> {
    return this._crud.get(null, this.ROUTE, params);
  }

  getproduct(id: string, params?: QueryParams): Observable<ProductDTO> {
    return this._crud.get(id, this.ROUTE, params);
  }

  createproduct(body: ProductCreateDTO, params?: QueryParams): Observable<any> {
    return this._crud.post(null, body, this.ROUTE, params);
  }

  updateproduct(
    body: ProductUpdateDTO,
    id?: string,
    params?: QueryParams
  ): Observable<any> {
    return this._crud.put(id, body, this.ROUTE, params);
  }

  deleteproduct(id: string, params?: QueryParams): Observable<any> {
    return this._crud.delete(id, this.ROUTE, params);
  }

  getPaged(
    pageNumber: number,
    pageSize: number,
    filters?: string,
    sort?: string,
    order?: string
  ): Observable<PagedData<ProductDTO>> {
    return this._crud.get(null, `${this.ROUTE}/paged`, {
      pageNumber: pageNumber,
      pageSize: pageSize,
      filters: filters,
      sort: sort,
      order: order,
    });
  }
}
