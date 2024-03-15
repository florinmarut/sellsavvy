import { Injectable } from '@angular/core';
import { ConfigService } from '../config.service';
import { CrudService } from '../crud.service';
import { QueryParams } from '../../models/config.model';
import { Observable } from 'rxjs';
import {
  UserCreateDTO,
  UserDTO,
  UserUpdateDTO,
} from '../../models/dtos/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly ROUTE = this._config.getConfig().addresses['users'];

  constructor(
    private readonly _config: ConfigService,
    private readonly _crud: CrudService
  ) {}

  getUsers(params?: QueryParams): Observable<Array<UserDTO>> {
    return this._crud.get(null, this.ROUTE, params);
  }

  getUser(id: string, params?: QueryParams): Observable<UserDTO> {
    return this._crud.get(id, this.ROUTE, params);
  }

  createUser(body: UserCreateDTO, params?: QueryParams): Observable<any> {
    return this._crud.post(null, body, this.ROUTE, params);
  }

  updateUser(
    id: string,
    body: UserUpdateDTO,
    params?: QueryParams
  ): Observable<any> {
    return this._crud.put(id, body, this.ROUTE, params);
  }

  deleteUser(id: string, params?: QueryParams): Observable<any> {
    return this._crud.delete(id, this.ROUTE, params);
  }
}
