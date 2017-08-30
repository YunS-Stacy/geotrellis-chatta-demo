import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[gdLayerActionBtn]'
})
export class ButtonDirective {
  @HostBinding('class.-clicked') @Input() isClicked: boolean;

  @Input() panelName: string;
  @Output() expandPanel = new EventEmitter<object>();

  // @HostBinding('class.-clicked') isClicked: boolean;
  @HostListener('click', ['$event']) onClick(e) {
    this.isClicked = !this.isClicked;
    this.expandPanel.emit({name: this.panelName, isClicked: this.isClicked});
  }

  constructor(
  ) {
    this.isClicked = false;
  }
}
