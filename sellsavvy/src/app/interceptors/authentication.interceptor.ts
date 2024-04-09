import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ACCESS_TOKEN } from '../models/constants.const';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);

  if (storageService.existsInLocalStorage(ACCESS_TOKEN)) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${storageService.fetchFromLocalStorage(
          ACCESS_TOKEN
        )}`,
      },
    });
  }

  return next(req);
};
