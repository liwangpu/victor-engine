import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ComponentIdGenerator } from 'victor-core';
import { selectFormDesignerState } from 'victor-editor/state-store';
import { first } from 'rxjs/operators';
import * as shortid from 'shortid';

@Injectable()
export class ComponentIdGeneratorService implements ComponentIdGenerator {

  constructor(
    @Inject(Store)
    private store: Store
  ) { }

  async generate(type: string, parentId?: string): Promise<string> {
    // console.log('generate id:', type, parentId);
    // const state = await this.store.select(selectFormDesignerState).pipe(first()).toPromise();
    // const ids = Object.keys(state.componentTree);
    // const types = ids.map(id => state.componentTree[id].type);
    // let nid = `${type}${types.length + 1}`;
    // if (parentId && parentId !== 'page') {
    //   nid = `${parentId}_${nid}`;
    // }
    // return nid;

    return shortid.generate();
  }
}
