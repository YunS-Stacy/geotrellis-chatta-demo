import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[gdButton]'
})
export class ButtonDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click') onClick() {
    this.toggleClicked();
  }

  private toggleClicked() {
    if (this.el.nativeElement.className.includes(' -clicked')) {
      this.el.nativeElement.className = this.el.nativeElement.className.replace(' -clicked', '');
    } else {
      this.el.nativeElement.className += ' -clicked';
    }
  }
}
