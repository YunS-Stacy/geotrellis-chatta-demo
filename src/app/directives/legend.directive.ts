import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[gdLegend]'
})
export class LegendDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }

}
