import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, Output, OnInit, QueryList, Renderer2, ViewChild } from '@angular/core';
import * as chroma from 'chroma-js';

@Component({
  selector: 'gd-layer-card',
  templateUrl: './layer-card.component.html'
})
export class LayerCardComponent implements OnInit {

  @ViewChild('custom') el: ElementRef;
  @Input() map: L.Map;

  @HostBinding('class.-on') @Input() show = true;
  @Output() showChange = new EventEmitter<boolean>();

  @Input() opacity: number;
  @Output() opacityChange = new EventEmitter<number>();

  @Input() weights: number[] = [];
  @Output() weightsChange = new EventEmitter<number[]>();

  @Input() name = '';
  @Input() params: string[] = [];

  expanded = '';

  colorArray: string[] = ['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1'];
  colorDomain: number[] = [0, 0.5, 0.6, 1];
  colorNumber = 10;
  colorPalette: string[];

  @Input() layerActions: string[] = ['info', 'weight', 'opacity'];



  hideLayer(checked: boolean): void {
    this.showChange.emit(checked);
  }
  changeOpacity(opacity: number): void {
    this.opacityChange.emit(opacity);
  }

  itemWeightChange(): void {
    this.weightsChange.emit(this.weights);
  }
  toAbs(val: number): number {
    return Math.abs(val);
  }

  getPreset(val: string): void {
    const valArray = val.split(',').map(el => {
      return Number(el);
    });
    if (valArray.length > 1) {
      this.weightsChange.emit(valArray);
    } else {
      // console.log(this.el.nativeElement)
      this.expanded = 'weight';
    }
  }

  constructor(
    private _rd: Renderer2
  ) {}

  ngOnInit() {
    this.colorPalette = chroma.scale(this.colorArray).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10);
  }
}
