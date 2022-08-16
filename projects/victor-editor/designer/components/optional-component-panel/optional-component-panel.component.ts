import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Injector } from '@angular/core';
import { OptionalComponentDefinition, OptionalComponentGroup } from '../../models';
import { SubSink } from 'subsink';
import * as _ from 'lodash';
import { DropContainerOpsatService } from 'victor-editor/drop-container';
import { DynamicComponentRegistry, DYNAMIC_COMPONENT_REGISTRY, LazyService } from 'victor-core';
import { TranslateService } from '@ngx-translate/core';
import { COMPONENT_GROUP_SORT_RULE } from 'victor-editor';
import * as faker from 'faker';
@Component({
  selector: 'victor-designer-optional-component-panel',
  templateUrl: './optional-component-panel.component.html',
  styleUrls: ['./optional-component-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionalComponentPanelComponent implements OnInit, OnDestroy {

  componentGroups?: OptionalComponentGroup[] = [];
  dropContainers: string[] = [];
  @LazyService(DropContainerOpsatService)
  private readonly opsat: DropContainerOpsatService;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(DYNAMIC_COMPONENT_REGISTRY)
  private readonly dynamicComponentRegistry: DynamicComponentRegistry;
  @LazyService(COMPONENT_GROUP_SORT_RULE, [])
  private readonly componentGroupSortRule: string[];
  @LazyService(TranslateService)
  private readonly translater: TranslateService;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  async ngOnInit(): Promise<void> {
    const des = await this.dynamicComponentRegistry.getComponentDescriptions();
    const groupTypes = des.map(c => c.group).filter(g => g ? true : false);
    const allGroupTypes = [];
    const typeMap = new Set(groupTypes);
    this.componentGroupSortRule.forEach(it => {
      if (typeMap.has(it)) {
        allGroupTypes.push(it);
        typeMap.delete(it);
      }
    });
    typeMap.forEach(v => {
      allGroupTypes.push(v);
    });

    allGroupTypes.forEach(gt => {
      const components: OptionalComponentDefinition[] = des.filter(x => x.group === gt).map(x => ({ type: x.type, title: x.title }));
      this.componentGroups.push({
        title: this.translater.instant(`dynamicComponentGroup.${gt}`),
        components
      });
    });
    this.cdr.markForCheck();
  }

}
