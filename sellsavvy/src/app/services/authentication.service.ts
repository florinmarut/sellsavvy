import { Inject, Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import Config, { QueryParams } from '../models/config.model';
import { LoginBody } from '../models/authentication.model';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { CrudService } from './crud.service';
import { ACCESS_TOKEN } from '../models/constants.const';
import { StorageService } from './storage.service';
import { UserDTO } from '../models/dtos/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _config!: Config;
  private readonly PROFILE_ROUTE: string;
  private readonly _loggedIn$ = new BehaviorSubject<boolean>(
    this.isTokenAvailable()
  );
  private readonly _user$ = new BehaviorSubject<UserDTO | null | undefined>(
    undefined
  );

  get isLoggedIn() {
    return this._loggedIn$.asObservable();
  }

  get user() {
    return this._user$.asObservable();
  }

  constructor(
    private readonly _configService: ConfigService,
    private readonly _crud: CrudService,
    private readonly _storage: StorageService
  ) {
    this._config = this._configService.getConfig();
    this.PROFILE_ROUTE = `${this._config.addresses['users']}/profile`;
  }

  login(body: LoginBody, params?: QueryParams): Observable<any> {
    return this._crud
      .post(null, body, this._config.addresses['login'], params)
      .pipe(
        map((response: any) => {
          this._storage.addToLocalStorage(ACCESS_TOKEN, response.accessToken);
          this._loggedIn$.next(true);
          return response;
        }),
        switchMap(() => {
          return this.getProfile().pipe(
            map((response) => {
              this._user$.next(response);
              return response;
            })
          );
        })
      );
  }

  register(user: any): Observable<any> {
    return this._crud
      .post(null, user, this._config.addresses['register'])
      .pipe(
        map((value) => value),
        catchError((error) => throwError(() => error))
      );
  }

  private getProfile(): Observable<UserDTO> {
    return this._crud.get(null, this.PROFILE_ROUTE);
  }

  isTokenAvailable(): boolean {
    const token = this._storage?.fetchFromLocalStorage(ACCESS_TOKEN);
    return token ? true : false;
  }
}
