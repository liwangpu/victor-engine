import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import SortableJs from 'sortablejs';

@Directive({
  selector: '[victorOptionalComponents]'
})
export class OptionalComponentsDirective implements OnInit {

  @Input('victorOptionalComponents')
  list!: any[];
  @Input()
  dragItemClass!: string;
  constructor(
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    // console.log('el:', this.el.nativeElement);
    // console.log('list:', this.list);
    SortableJs.create(this.el.nativeElement, {
      group: {
        name: 'victor-editor',
        pull: 'clone',
        put: false
      },
      sort: false,
      setData: (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl: HTMLElement) => {
        const arr = dragEl.parentNode!.querySelectorAll(`.${this.dragItemClass}`)
        let index = -1;
        for (let idx = arr.length - 1; idx >= 0; idx--) {
          if (arr[idx] === dragEl) {
            index = idx;
            break;
          }
        }
        let data = this.list[index];
        dataTransfer.setData('Text', JSON.stringify(data));
      },
      onStart: function (/**Event*/evt) {
        // evt.oldIndex;  // element index within parent
        // console.log('stat:', evt);
        // setTimeout(() => {
        //   debugger;
        // }, 1000);
      },
      onEnd(evt: SortableJs.SortableEvent) {
        if (evt.from === evt.to) { return; }
        const el = evt.item;  // dragged HTMLElement
        el.parentElement.removeChild(el);
      },
      onChange(evt) {
        // debugger
      },
    });
  }


}
