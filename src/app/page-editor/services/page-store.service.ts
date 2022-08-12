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

  async query(): Promise<DynamicComponentMetadata[]> {
    let metadatas = await this.db.table('pages').toArray();
    metadatas = metadatas || [];
    return metadatas.map(m => ({ ...m, id: m.id.toString() }))
  }

  async get(id: string): Promise<DynamicComponentMetadata> {
    const metadata = await this.db.table('pages').get(Number.parseInt(id as any));
    if (!metadata) { return null; }
    return { ...metadata, id: metadata.id.toString() }
  }

  async create(definition: DynamicComponentMetadata): Promise<string> {
    const id = await this.db.table('pages').add(definition);
    return id.toString();
  }

  async update(id: string, definition: DynamicComponentMetadata): Promise<void> {
    const nid = Number.parseInt(id as any);
    await this.db.table('pages').update(nid, { ...definition, id: nid });
  }

  async delete(id: string): Promise<void> {
    await this.db.table('pages').delete(Number.parseInt(id));
  }
}
