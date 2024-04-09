import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly _localStorage: Storage | undefined;

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this._localStorage = document.defaultView?.localStorage;
  }

  addToLocalStorage(key: string, value: any) {
    this._localStorage?.setItem(key, value);
  }

  removeFromLocalStorage(key: string) {
    this._localStorage?.removeItem(key);
  }

  fetchFromLocalStorage(key: string): string | null | undefined {
    return this._localStorage?.getItem(key);
  }

  existsInLocalStorage(key: string): boolean {
    const item = this._localStorage?.getItem(key);
    return item ? true : false;
  }
}
