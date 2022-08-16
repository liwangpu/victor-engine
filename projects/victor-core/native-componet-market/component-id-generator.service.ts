import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ComponentIdGenerator } from 'victor-core';
import * as shortid from 'shortid';

@Injectable()
export class ComponentIdGeneratorService implements ComponentIdGenerator {

  constructor(
    @Inject(Store)
    private store: Store
  ) { }

  async generate(type: string, parentId?: string): Promise<string> {
    return shortid.generate();
  }
}
