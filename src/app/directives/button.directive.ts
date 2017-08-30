import { Directive, HostBinding, HostListener, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[gdButton]'
})
export class ButtonDirective {
  constructor(
  ) {
    this.isClicked = false;

  }
  @Input() jsClass: string;
  @Output() expandPanel = new EventEmitter<object>();

  @HostBinding('class.-clicked') isClicked: boolean;
  @HostListener('click', ['$event']) onClick(e) {
    this.isClicked = !this.isClicked;
    console.log(this.jsClass);
    this.expandPanel.emit({class: this.jsClass, isClicked: this.isClicked});
  }
}
