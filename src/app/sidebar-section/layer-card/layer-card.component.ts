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

  name = 'lm';
  lmWeights: number[] = [3, -3, 0];
  lmOpacity = 0.6;

  colorArray: string[] = ['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1'];
  colorPalette: string[];

  infoPanel = false;
  weightPanel = false;
  opacityPanel = false;

  lmLayer: L.Layer;
  lmLayerActions: string[] = ['info', 'weight', 'opacity'];

  lmParams: string[] = ['philly_bars', 'philly_grocery_stores', 'philly_rail_stops'];
  changeOpacity(opacity: number) {
    this.lmOpacity = opacity;
    this.updateLayer();
  }
  updateWeights(klass, val, i) {
    let otherVal: number;
    if (klass[0] === 'desc') {
      otherVal = this.numSelectElements.map(el => {
        return el.nativeElement.value;
      })[i];
    } else {
      otherVal = this.descSelectElements.map(el => {
        return el.nativeElement.value;
      })[i];
    }
    this.lmWeights[i] = otherVal * val;
    this.updateLayer();
  }
  neglectParams(i) {
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
    this[`${e.class}Panel`] = e.isClicked;
    if (e.class === 'weight' && e.isClicked) {
      console.log(`select custom value`);
    }
  }

  getPreset(val: string) {
    const weightArray = val.split(',').map(el => {
      return Number(el);
    });
    if (weightArray.length > 1) {
      this.lmWeights = weightArray;
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
