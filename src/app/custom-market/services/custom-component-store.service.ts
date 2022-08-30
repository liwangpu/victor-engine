import { Injectable } from '@angular/core';
import Dexie from 'dexie';

export interface CustomComponentDescription {
  id: string;
  title: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomComponentStoreService {

  private readonly db = new Dexie("ComponentStore");
  constructor() {
    this.db.version(1).stores({
      components: '++id,title,type',
    });
    // console.log(`db:`, this.db);
  }

  async query(): Promise<CustomComponentDescription[]> {
    // const exists = await Dexie.exists('components');
    // // console.log(`exists:`, exists);
    // if (!exists) { return []; }
    let metadatas = await this.db.table('components').toArray();
    metadatas = metadatas || [];
    return metadatas.map(m => ({ ...m, id: m.id.toString() }))
  }

  async create(definition: CustomComponentDescription): Promise<string> {
    const id = await this.db.table('components').add(definition);
    return id.toString();
  }

  async delete(id: string): Promise<void> {
    await this.db.table('components').delete(Number.parseInt(id));
  }

}
