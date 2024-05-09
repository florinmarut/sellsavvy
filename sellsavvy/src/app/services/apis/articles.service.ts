import { Injectable } from '@angular/core';
import { CrudService } from '../crud.service';
import { ConfigService } from '../config.service';
import { QueryParams } from '../../models/config.model';
import {
  ArticleCreateDTO,
  ArticleDTO,
  ArticleUpdateDTO,
} from '../../models/dtos/article.model';
import { Observable } from 'rxjs';
import { PagedData } from '../../models/dtos/paged.model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private readonly ROUTE = this._config.getConfig().addresses['articles'];

  constructor(
    private readonly _config: ConfigService,
    private readonly _crud: CrudService
  ) {}

  getArticles(params?: QueryParams): Observable<Array<ArticleDTO>> {
    return this._crud.get(null, this.ROUTE, params);
  }

  getArticle(id: string, params?: QueryParams): Observable<ArticleDTO> {
    return this._crud.get(id, this.ROUTE, params);
  }

  createArticle(body: ArticleCreateDTO, params?: QueryParams): Observable<any> {
    return this._crud.post(null, body, this.ROUTE, params);
  }

  updateArticle(
    body: ArticleUpdateDTO,
    id?: string,
    params?: QueryParams
  ): Observable<any> {
    return this._crud.put(id, body, this.ROUTE, params);
  }

  deleteArticle(id: string, params?: QueryParams): Observable<any> {
    return this._crud.delete(id, this.ROUTE, params);
  }

  getPaged(
    pageNumber: number,
    pageSize: number,
    filters?: string,
    sort?: string,
    order?: string
  ): Observable<PagedData<ArticleDTO>> {
    return this._crud.get(null, `${this.ROUTE}/paged`, {
      pageNumber: pageNumber,
      pageSize: pageSize,
      filters: filters,
      sort: sort,
      order: order,
    });
  }
}
