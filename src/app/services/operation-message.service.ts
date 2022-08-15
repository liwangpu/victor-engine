import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IOperationMessage } from 'victor-core';

@Injectable({
  providedIn: 'root'
})
export class OperationMessageService implements IOperationMessage {

  constructor(
    private notification: NzNotificationService
  ) { }

  success(message: string): void {
    this.notification.blank('温馨提示', `${message}`, {
      nzDuration: 2000
    })
      .onClick.subscribe();
  }

  info(message: string): void {
    throw new Error('Method not implemented.');
  }
  warn(message: string): void {
    throw new Error('Method not implemented.');
  }
  error(message: string): void {
    throw new Error('Method not implemented.');
  }
}
