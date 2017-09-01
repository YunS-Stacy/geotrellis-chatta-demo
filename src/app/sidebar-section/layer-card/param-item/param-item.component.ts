import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gd-param-item',
  templateUrl: './param-item.component.html'
})
export class ParamItemComponent implements OnInit {
  @Input() weight: number;
  @Input() param: string;
  @Output() weightChange = new EventEmitter<number>();

  abs(num: number) {
    return Math.abs(num);
  }
  neglectParam() {
    this.weightChange.emit(0);
  }

  updateWeight(desc: number, num: number) {
    this.weightChange.emit(desc * num);
  }
  constructor() { }

  ngOnInit() {
  }

}
