import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Config from '../models/config.model';
import { Observable, catchError, map, throwError } from 'rxjs';

export function configInitializerFactory(configService: ConfigService) {
  return () => configService.loadConfig();
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _configuration!: Config;

  constructor(private readonly _http: HttpClient) {}

  loadConfig(): Observable<boolean> {
    return this._http.get<Config>('./assets/config.json').pipe(
      map((config) => {
        this._configuration = config;
        return true;
      }),
      catchError((error) => {
        console.error('Error loading configuration:', error);
        return throwError(() => new Error('Error loading config'));
      })
    );
  }

  getConfig(): Config {
    return this._configuration;
  }
}
