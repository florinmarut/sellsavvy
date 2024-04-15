import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageMessageService {
  private _successTitle: string = 'Success';
  private _successMessage: string = 'Operation was executed successfully';
  private _failTitle: string = 'Fail';
  private _failMessage: string = 'Operation failed';

  get successTitle() {
    return this._successTitle;
  }

  set successTitle(value: string) {
    this._successTitle = value;
  }

  get successMessage() {
    return this._successMessage;
  }

  set successMessage(value: string) {
    this._successMessage = value;
  }
  get failTitle() {
    return this._failTitle;
  }

  set failTitle(value: string) {
    this._failTitle = value;
  }

  get failMessage() {
    return this._failMessage;
  }

  set failMessage(value: string) {
    this._failMessage = value;
  }

  constructor() {}
}
