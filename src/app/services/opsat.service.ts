import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export function topicFilter(topic: string): any {
  return filter((x: { topic: string; data: any }) => x.topic === topic);
}

export function topicFilters(...topics: Array<string>): any {
  return filter((x: { topic: string; data: any }) => topics.indexOf(x.topic) > -1);
}

export const dataMap: any = map((ms: { topic: string; data?: any }) => ms.data);

export const topicMap: any = map((ms: { topic: string; data?: any }) => ms.topic);

@Injectable({
  providedIn: 'root'
})
export class OpsatService {

  private _message$: Subject<{ topic: string; data: any }> = new Subject<{ topic: string; data: any }>();

  public get message$(): Observable<{ topic: string; data: any }> {
    return this._message$.asObservable();
  }

  public publish(topic: string, data?: any): void {
    this._message$.next({ topic, data });
  }
}
