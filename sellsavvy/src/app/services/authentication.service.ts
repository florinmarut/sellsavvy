import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import Config, { QueryParams } from '../models/config.model';
import { LoginBody } from '../models/authentication.model';
import { Observable } from 'rxjs';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly _config!: Config;

  constructor(private readonly _configService: ConfigService, private readonly _crud: CrudService) {
    this._config = this._configService.getConfig();
  }

  login(body: LoginBody, params?: QueryParams): Observable<any> {
    return this._crud.post(null, body, this._config.addresses['login'], params);
  }
}
