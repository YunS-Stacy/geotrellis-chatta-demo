import { Directive, HostListener, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[gdButton]'
})
export class ButtonDirective {

  @Input() action: string;
  @Input() expanded: string;
  @Output() expandedChange = new EventEmitter<string>();
  @HostListener('click') onClick(e) {
    this.expanded = this.action;
    this.expandedChange.emit(this.expanded);
  }
}
