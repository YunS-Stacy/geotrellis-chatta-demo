import { Component, OnInit, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'gd-param-item',
  templateUrl: './param-item.component.html'
})
export class ParamItemComponent implements OnInit {
  @Input() weight: number;
  @Input() param: string;
  @Output() weightChange = new EventEmitter<number>();
  @HostBinding('class.-inactive') isInactive = false;

  abs(num: number): number {
    return Math.abs(num);
  }
  neglectParam(): void {
    this.isInactive  = !this.isInactive;
    this.weightChange.emit(0);
  }

  updateWeight(desc: number, num: number): void {
    this.weightChange.emit(desc * num);
  }
  constructor() { }

  ngOnInit() {
  }

}
