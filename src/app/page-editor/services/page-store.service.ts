import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { DynamicComponentMetadata } from 'victor-core';

@Injectable()
export class PageStoreService {

  private readonly db = new Dexie("PageStore");
  constructor() {
    this.db.version(1).stores({
      pages: '++id,title,type',
    });
  }

  query(): Promise<DynamicComponentMetadata[]> {
    return this.db.table('pages').toArray();
  }

  get(id: string): Promise<DynamicComponentMetadata> {
    return this.db.table('pages').get(Number.parseInt(id as any));
  }

  async create(definition: DynamicComponentMetadata): Promise<string> {
    const id = await this.db.table('pages').add(definition);
    return id.toString();
  }

  async update(id: string, definition: DynamicComponentMetadata): Promise<void> {
    await this.db.table('pages').update(Number.parseInt(id as any), definition);
  }

  async delete(id: string): Promise<void> {
    await this.db.table('pages').delete(Number.parseInt(id));
  }
}
