import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Config from '../models/config.model';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private readonly _http: HttpClient) { }

  loadConfig(): Observable<Config> {
    return this._http.get<Config>('./assets/config.json')
      .pipe(
        catchError(error => {
          console.error("Error loading configuration:", error);
          return throwError(() => new Error('Error loading config')); 
        })
      );
  }
}
