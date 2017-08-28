import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[gdButton]'
})
export class ButtonDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click') onClick() {
    this.toggleClicked();
    console.log('nouse up');
  }

  private toggleClicked() {
    console.log(this.el.nativeElement);
    // this.el.nativeElement.class = 'color';
  }
}
