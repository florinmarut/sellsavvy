import { Injectable } from '@angular/core';
import Config, { Address, QueryParams } from '../models/config.model';
import { Observable } from 'rxjs';
import { formatQueryUrl } from '../utils/utils';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private _configurations!: Config;
  constructor(
    private readonly _config: ConfigService,
    private readonly _http: HttpClient
  ) {
    this._configurations = this._config.getConfig();
  }

  get<Type>(
    id: string | null,
    route: string | Address,
    qp: QueryParams = {}
  ): Observable<Type> {
    const query = formatQueryUrl(qp);
    return this._http.get(
      `${this._configurations.host}:${this._configurations.port}/${route}${
        id ? '/' + id : ''
      }${query}`
    ) as Observable<Type>;
  }

  delete<Type>(
    id: string | null,
    route: string | Address,
    qp: QueryParams = {}
  ): Observable<Type> {
    const query = formatQueryUrl(qp);
    return this._http.delete(
      `${this._configurations.host}:${this._configurations.port}/${route}${
        id ? '/' + id : ''
      }${query}`
    ) as Observable<Type>;
  }

  post<Type>(
    id: string | null,
    data: any,
    route: string | Address,
    qp: QueryParams = {}
  ) {
    const query = formatQueryUrl(qp);
    return this._http.post(
      `${this._configurations.host}:${this._configurations.port}/${route}${
        id ? '/' + id : ''
      }${query}`,
      data
    ) as Observable<Type>;
  }

  put<Type>(
    id: string | null = null,
    data: any,
    route: string | Address,
    qp: QueryParams = {}
  ) {
    const query = formatQueryUrl(qp);
    return this._http.put(
      `${this._configurations.host}:${this._configurations.port}/${route}${
        id ? '/' + id : ''
      }${query}`,
      data
    ) as Observable<Type>;
  }

  patch<Type>(
    id: string | null,
    data: any,
    route: string | Address,
    qp: QueryParams = {}
  ) {
    const query = formatQueryUrl(qp);
    return this._http.patch(
      `${this._configurations.host}:${this._configurations.port}/${route}${
        id ? '/' + id : ''
      }${query}`,
      data
    ) as Observable<Type>;
  }
}
