import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, Output, OnInit, QueryList, Renderer2, ViewChild } from '@angular/core';
import * as chroma from 'chroma-js';
import { LayerService } from '../../services/layer.service';


@Component({
  selector: 'gd-layer-card',
  templateUrl: './layer-card.component.html',
  providers: [LayerService]
})
export class LayerCardComponent implements OnInit {
  @ViewChild('custom') el: ElementRef;
  @Input() map: L.Map;

  @HostBinding('class.-on') @Input() show: boolean;
  @Output() showChange = new EventEmitter<boolean>();

  @Input() opacity: number;
  @Output() opacityChange = new EventEmitter<number>();

  @Input() weights: number[];
  @Output() weightsChange = new EventEmitter<number[]>();

  @Input() name: string;

  expanded = '';

  colorArray: string[] = ['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1'];
  colorDomain: number[] = [0, 0.5, 0.6, 1];
  colorNumber = 10;
  colorPalette: string[];

  lmLayer: L.Layer;
  lmLayerActions: string[] = ['info', 'weight', 'opacity'];

  lmParams: string[] = ['philly_bars', 'philly_grocery_stores', 'philly_rail_stops'];

  hideLayer(checked: boolean) {
    this.showChange.emit(checked);
  }
  changeOpacity(opacity: number) {
    this.opacityChange.emit(opacity);
  }

  itemWeightChange() {
    this.weightsChange.emit(this.weights);
  }
  toAbs(val: number) {
    return Math.abs(val);
  }

  getPreset(val: string) {
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
  ) {

  }

  ngOnInit() {
    this.show = true;
    this.name = 'lm';
    this.weights = [3, -3, 0];
    this.colorPalette = chroma.scale(this.colorArray).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10);
  }
}
