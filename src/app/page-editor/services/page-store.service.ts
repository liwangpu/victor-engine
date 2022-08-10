import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Dexie from 'dexie';

export interface PageDefinition {
  id?: number;
  title: string;
}

@Injectable()
export class PageStoreService {

  private readonly db = new Dexie("PageStore");
  constructor() {
    this.db.version(1).stores({
      pages: '++id,title',
    });
  }

  query(): Promise<PageDefinition[]> {
    return this.db.table('pages').toArray();
  }

  async create(definition: PageDefinition): Promise<number> {
    const id = await this.db.table('pages').add(definition);
    return Number(id);
  }

  async delete(id: number): Promise<void> {
    await this.db.table('pages').delete(id);
  }
}
