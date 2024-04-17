import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { CrudService } from '../crud.service';
import { QueryParams } from '../../models/config.model';
import { Observable } from 'rxjs';
import {
  ReviewCreateDTO,
  ReviewDTO,
  ReviewUpdateDTO,
} from '../../models/dtos/review.model';
import { PagedData } from '../../models/dtos/paged.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private readonly ROUTE = this._config.getConfig().addresses['reviews'];

  constructor(
    private readonly _config: ConfigService,
    private readonly _crud: CrudService
  ) {}

  getReviews(params?: QueryParams): Observable<Array<ReviewDTO>> {
    return this._crud.get(null, this.ROUTE, params);
  }

  getPagedReviews(
    pageNumber: number = 1,
    pageSize: number = 25,
    filters?: string,
    sort?: string,
    order?: string
  ): Observable<PagedData<ReviewDTO>> {
    return this._crud.get(null, `${this.ROUTE}/paged`, {
      pageNumber: pageNumber,
      pageSize: pageSize,
      filters: filters,
      sort: sort,
      order: order,
    });
  }

  getReview(id: string, params?: QueryParams): Observable<ReviewDTO> {
    return this._crud.get(id, this.ROUTE, params);
  }

  createReview(body: ReviewCreateDTO, params?: QueryParams): Observable<any> {
    return this._crud.post(null, body, this.ROUTE, params);
  }

  updateReview(
    id: string,
    body: ReviewUpdateDTO,
    params?: QueryParams
  ): Observable<any> {
    return this._crud.put(id, body, this.ROUTE, params);
  }

  deleteReview(id: string, params?: QueryParams): Observable<any> {
    return this._crud.delete(id, this.ROUTE, params);
  }
}
