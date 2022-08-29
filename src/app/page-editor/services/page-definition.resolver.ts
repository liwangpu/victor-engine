import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { PageStoreService } from './page-store.service';

@Injectable()
export class PageDefinitionResolver implements Resolve<any> {
  constructor(
    private pageStore: PageStoreService
  ) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    const definition = await this.pageStore.get(route.params['id']);
    // const schema = definition;
    return definition;
  }
}
