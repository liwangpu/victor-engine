import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, forwardRef, Injector, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { DynamicComponent, DynamicComponentRegistry, DYNAMIC_COMPONENT, DYNAMIC_COMPONENT_METADATA, DYNAMIC_COMPONENT_REGISTRY, LazyService } from 'victor-core';
import { DropContainerComponent, DropContainerOpsatService } from 'victor-editor/drop-container';
import { SubSink } from 'subsink';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'victor-designer-page-presentation',
  templateUrl: './page-presentation.component.html',
  styleUrls: ['./page-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: DYNAMIC_COMPONENT, useExisting: forwardRef(() => PagePresentationComponent) }
  ]
})
export class PagePresentationComponent implements OnInit {
  // id: string = 'page';
  // type: string = 'page';
  dropContainers: string[] = [];
  @ViewChild('container', { static: true, read: ViewContainerRef })
  protected container: ViewContainerRef;
  @LazyService(DropContainerOpsatService)
  private readonly opsat: DropContainerOpsatService;
  @LazyService(ChangeDetectorRef)
  private readonly cdr: ChangeDetectorRef;
  @LazyService(ComponentFactoryResolver)
  protected cfr: ComponentFactoryResolver;
  @LazyService(DYNAMIC_COMPONENT_REGISTRY)
  private readonly dynamicComponentRegistry: DynamicComponentRegistry;
  private subs = new SubSink();
  constructor(
    protected injector: Injector
  ) {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

 async ngOnInit(): Promise<void> {
    const fac = this.cfr.resolveComponentFactory(DropContainerComponent);
    const ij = Injector.create({
      providers: [
        { provide: DYNAMIC_COMPONENT_METADATA, useValue: { id: 'page', type: 'page' } }
      ],
      parent: this.injector
    });
    this.container.createComponent(fac, null, ij);


    // const fac = this.cfr.resolveComponentFactory(DropContainerComponent);
    // const des = await this.dynamicComponentRegistry.getComponentDescription('tabs');
    // const ij = Injector.create({
    //   providers: [
    //     {
    //       provide: DYNAMIC_COMPONENT_METADATA, useValue: {
    //         id: 'page', type: 'page', body: [
    //           {
    //             id: uuidv4(),
    //             type: 'tab',
    //             title: '页签1'
    //           }
    //         ]
    //       }
    //     }
    //   ],
    //   parent: this.injector
    // });
    // this.container.createComponent(des.fac, null, ij);

    this.cdr.markForCheck();
  }

}

