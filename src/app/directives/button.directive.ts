import { Directive, HostBinding, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'button'
})
export class ButtonDirective {
  constructor(private rd: Renderer2) {
    this.isClicked = false;
  }

  @HostBinding('class.-clicked') isClicked: boolean;

  @HostListener('click') onClick() {
    this.isClicked = this.isClicked ? false : true;
  }
}
