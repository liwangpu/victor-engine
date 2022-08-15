import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PageStoreService } from './page-store.service';

@Injectable()
export class PageListPreviewGuard implements CanActivate {
  constructor(
    private router: Router,
    private pageStore: PageStoreService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (state.url !== '/pages/list') { return true; }
    const pages = await this.pageStore.query();
    const firstPage = pages.length ? pages[0] : null;
    if (firstPage) {
      this.router.navigate(['/pages', 'list', 'dynamic', firstPage.id]);
      return false;
    }
    return true;
  }

}
