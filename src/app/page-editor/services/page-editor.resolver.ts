import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PageStoreService } from './page-store.service';

@Injectable()
export class PageEditorResolver implements Resolve<any> {
  constructor(
    private pageStore: PageStoreService
  ) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    const definition = await this.pageStore.get(route.params.id);
    const schema = definition.schema || { id: `${definition.id}`, type: 'page', title: definition.title || '页面' };
    return schema;
  }
}
