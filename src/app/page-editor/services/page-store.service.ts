import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PageDefinition {
  id?: string;
  title: string;
}

@Injectable()
export class PageStoreService {

  constructor() { }

  async create(definition: PageDefinition): Promise<PageDefinition> {
    console.log('create:', definition);
    return null;
  }
}
