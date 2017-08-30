import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import * as chroma from 'chroma-js';
import { LayerService } from '../../services/layer.service';


@Component({
  selector: 'gd-layer-card',
  templateUrl: './layer-card.component.html',
  styleUrls: ['./layer-card.component.scss'],
  providers: [LayerService]
})
export class LayerCardComponent {
  @ViewChildren('numSelect') numSelectElements: QueryList<ElementRef>;
  @ViewChildren('descSelect') descSelectElements: QueryList<ElementRef>;
  @Input() map: L.Map;
  @Output() updateLM = new EventEmitter <L.Layer>();
  @Output() lmOpacityChange = new EventEmitter <number>();

  // generate legend
  colorArray: string[] = ['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1'];
  colorDomain: number[] = [0, 0.5, 0.6, 1];
  colorNumber = 10;
  colorPalette: string[];

  // model info
  name = 'lm';
  lmWeights: number[] = [3, -3, 0];
  @Input() lmOpacity = 0.6;

  infoPanel = false;
  weightPanel = false;
  opacityPanel = false;

  lmLayer: L.Layer;
  lmLayerActions: string[] = ['info', 'weight', 'opacity'];

  lmParams: string[] = ['philly_bars', 'philly_grocery_stores', 'philly_rail_stops'];
  lmParamsRange: number[] = [0, 1, 2, 3];

  // preset model
  lmPresets = [
    {
      'value': [3, -3, 0],
      'text': `NEAR Bars, BUT NOT Grocery Stores`
    },
    {
      'value': [-3, 3, 0],
      'text': `NEAR Grocery Stores, BUT NOT Bars`
    },
    {
      'value': [0, -3, 3],
      'text': `NEAR Rail Stops, BUT NOT Grocery Stores`
    },
    {
      'value': [3, 0, 0],
      'text': `NEAR Bars`
    },
    {
      'value': [0],
      'text': `Custom`
    }
  ];
  presetIndex = 0;
  selectIndex = 0;

  toggleLayer() {
    if (this.lmOpacity === 0) {
      this.changeOpacity(1);
    } else {
      this.changeOpacity(0);
    }
  }
  changeOpacity(opacity: number) {
    this.lmOpacityChange.emit(opacity);
  }

  updateWeights(klass, val, i) {
    let otherVal: number;
    if (klass[0] === 'desc') {
      otherVal = this.numSelectElements.map(el => {
        return Number(el.nativeElement.value);
      })[i];
    } else {
      otherVal = this.descSelectElements.map(el => {
        return Number(el.nativeElement.value);
      })[i];
    }
    this.lmWeights[i] = otherVal * val;
    this.updateLayer();
  }

  neglectParam(i) {
    this.lmWeights[i] = 0;
    this.updateLayer();
  }
  updateLayer() {
    this.layerService.getLayer(this.lmWeights).subscribe(res => {
      this.lmLayer = L.tileLayer.wms('https://geotrellis.io/gt/weighted-overlay/wms', {
          breaks: res,
          layers: this.lmParams.join(),
          format: 'image/png',
          weights: this.lmWeights,
          transparent: true,
          attribution: 'Azavea',
          uppercase: true,
          opacity: this.lmOpacity,
          pane: this.name
        });
      this.updateLM.emit(this.lmLayer);
    }, console.error);
  }

  expandPanel(e) {
    this[`${e.name}Panel`] = e.isClicked;
    if (e.name === 'weight' && e.isClicked) {
      console.log(`select custom value`);
    }
  }
  toAbs(val: number) {
    return Math.abs(val);
  }

  getPreset(val: string) {
    // here pass a string;
    const valArr = val.split(',').map(el => {
      return Number(el);
    });
    if (valArr.length === 1) {
      this.presetIndex = 5;
      this.weightPanel = true;
    } else {
      this.lmWeights = valArr;
      this.updateLayer();
    }
  }

  constructor(
    private layerService: LayerService,
    private rd: Renderer2
  ) {
    this.colorPalette = chroma.scale(this.colorArray).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10);
    this.updateLayer();
  }
}
