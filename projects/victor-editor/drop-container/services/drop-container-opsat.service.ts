import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DropContainer } from '../models/drop-container';

@Injectable()
export class DropContainerOpsatService {

  private _componentHovering$ = new Subject<string>();

  get componentHovering$(): Observable<string> {
    return this._componentHovering$.asObservable();
  }
  private hoverPath: string[] = [];
  publishComponentHover(id: string): void {
    // this._componentHovering$.next(id);
    this.hoverPath.push(id);
    this._componentHovering$.next(this.getHoveringComponent());
  }


  publishComponentUnHover(): void {
    // this._componentHovering$.next(id);
    this.hoverPath.pop();
    this._componentHovering$.next(this.getHoveringComponent());
  }

  private getHoveringComponent(): string {
    if (!this.hoverPath.length) { return null; }
    return this.hoverPath[this.hoverPath.length - 1];
  }
}
