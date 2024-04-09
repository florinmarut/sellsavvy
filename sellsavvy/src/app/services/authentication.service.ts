import { Inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import Config, { QueryParams } from '../models/config.model';
import { LoginBody } from '../models/authentication.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CrudService } from './crud.service';
import { ACCESS_TOKEN } from '../models/constants.const';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _config!: Config;
  private readonly _loggedIn = new BehaviorSubject<boolean>(
    this.isTokenAvailable()
  );

  get isLoggedIn() {
    return this._loggedIn.asObservable();
  }

  constructor(
    private readonly _configService: ConfigService,
    private readonly _crud: CrudService,
    private readonly _storage: StorageService
  ) {
    this._config = this._configService.getConfig();
  }

  login(body: LoginBody, params?: QueryParams): Observable<any> {
    return this._crud
      .post(null, body, this._config.addresses['login'], params)
      .pipe(
        map((response: any) => {
          this._storage.addToLocalStorage(ACCESS_TOKEN, response.accessToken);
          this._loggedIn.next(true);
          return response;
        })
      );
  }

  isTokenAvailable(): boolean {
    const token = this._storage?.fetchFromLocalStorage(ACCESS_TOKEN);
    return token ? true : false;
  }
}
