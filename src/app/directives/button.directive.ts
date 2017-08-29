import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[gdButton]'
})
export class ButtonDirective {
  @HostBinding('class.-clicked') isClicked: boolean;
  @HostListener('click') onClick() {
    this.isClicked = this.isClicked ? false : true;
  }

  constructor(private el: ElementRef) {
    this.isClicked = false;
  }
}
