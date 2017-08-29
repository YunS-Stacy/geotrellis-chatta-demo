import { Component, EventEmitter, Output } from '@angular/core';
import * as chroma from 'chroma-js';
import { LayerService } from '../../services/layer.service';


@Component({
  selector: 'gd-layer-card',
  templateUrl: './layer-card.component.html',
  styleUrls: ['./layer-card.component.scss'],
  providers: [LayerService]
})
export class LayerCardComponent {
  lmWeights: number[] = [3, -3, 0];
  @Output() updateLM = new EventEmitter <L.Layer>();

  colorArray: string[] = ['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1'];
  colorPalette: string[];

  infoPanel = false;
  weightPanel = false;
  opacityPanel = false;

  lmLayer: L.Layer;

  params: string[] = ['philly_bars', 'philly_grocery_stores', 'philly_rail_stops'];

  updateWeights(){};

  updateLayer(weights: number[]) {
    this.lmWeights = weights;
    this.layerService.getLayer(this.lmWeights).subscribe(res => {
      this.lmLayer = L.tileLayer.wms('https://geotrellis.io/gt/weighted-overlay/wms', {
          breaks: res,
          layers: this.params.join(),
          format: 'image/png',
          weights: this.lmWeights,
          transparent: true,
          attribution: 'Azavea',
          uppercase: true,
          opacity: 0.6,
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
      this.updateLayer(this.lmWeights);
  }

  //   if (val !== 'undefined') {
  //     const weightArray = val.split(',').map(item => {
  //             return Number(item);
  //     });
  //     val.split(',').forEach((item, index) => {

  //         if (item < 0) {
  //             $(`.js-weight > :nth-child(${index + 2}) > li > .desc`).val(`-1`);
  //         } else if (item > 0) {
  //             $(`.js-weight > :nth-child(${index + 2}) > li > .desc`).val(`1`);
  //         }
  //         $(`.js-weight > :nth-child(${index + 2}) > li > .num`).val(Math.abs(item))
  //     });
  //     lmWeights = weightArray;
  //     updateLM(lmParams, lmWeights, lmLayer.numBreaks);
  // } else {
  //     $('button.js-weight').addClass('-clicked');
  //     $('.action-panel.js-weight').addClass('-expanded');
  // }
  }

  constructor(
    private layerService: LayerService
  ) {
    this.colorPalette = chroma.scale(this.colorArray).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10);
    this.updateLayer(this.lmWeights);
  }
}
