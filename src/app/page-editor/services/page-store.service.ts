import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Dexie from 'dexie';
import { DynamicComponentMetadata } from 'victor-core';

export interface PageDefinition {
  id?: number;
  title: string;
  schema?: DynamicComponentMetadata;
}

@Injectable()
export class PageStoreService {

  private readonly db = new Dexie("PageStore");
  constructor() {
    this.db.version(1).stores({
      pages: '++id,title,schema',
    });
  }

  query(): Promise<PageDefinition[]> {
    return this.db.table('pages').toArray();
  }

  get(id: number): Promise<PageDefinition> {
    return this.db.table('pages').get(Number.parseInt(id as any));
  }

  async create(definition: PageDefinition): Promise<number> {
    const id = await this.db.table('pages').add(definition);
    return Number(id);
  }

  async delete(id: number): Promise<void> {
    await this.db.table('pages').delete(id);
  }
}
