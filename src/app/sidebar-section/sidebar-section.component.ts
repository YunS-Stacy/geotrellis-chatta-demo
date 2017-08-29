import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import * as chroma from 'chroma-js';
import { LayerService } from '../services/layer.service';


@Component({
  selector: 'gd-sidebar-section',
  templateUrl: './sidebar-section.component.html',
  styleUrls: ['./sidebar-section.component.scss'],
  providers: [LayerService]
})
export class SidebarSectionComponent implements OnChanges {
  @Input() lmWeights: number[];
  lmLayer: L.Layer;

  collapsed: false;

  colorArray: string[] = ['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1'];

  colorPalette: string[];


  layers: L.Layer[] = [];

  generateLegend(arr: string[]) {
    return chroma.scale(arr).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10);
}

  updateLayers(layer: L.Layer) {
    if (this.layers.length > 0) {
      this.layers.pop();
      this.layers.push(layer);
    } else {
      this.layers.push(layer);
    }
  }


  constructor(private layerService: LayerService) {
    // this.colorPalette = this.generateLegend(this.colorArray);
    // this.layerService.getLayer(this.lmWeights)
    //     .subscribe(res => {
    //       this.layers.push(
    //         L.tileLayer.wms('https://geotrellis.io/gt/weighted-overlay/wms', {
    //           breaks: res,
    //           layers: ['philly_bars', 'philly_grocery_stores', 'philly_rail_stops'].join(),
    //           format: 'image/png',
    //           weights: this.lmWeights,
    //           transparent: true,
    //           attribution: 'Azavea',
    //           uppercase: true,
    //           opacity: 0.6
    //         })
    //       );
    //     },
    //     console.error
    // );
  }


  ngOnChanges(change){
    console.log(change)
  }
}
