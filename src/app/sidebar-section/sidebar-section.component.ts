import { Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import * as chroma from 'chroma-js';
import { LayerService } from '../services/layer.service';


@Component({
  selector: 'gd-sidebar-section',
  templateUrl: './sidebar-section.component.html',
  styleUrls: ['./sidebar-section.component.scss'],
  providers: [LayerService]
})
export class SidebarSectionComponent {
  @Input() map: L.Map;
  lmLayer: L.Layer;
  collapsed: false;
  colorArray: string[] = ['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1'];
  colorPalette: string[];
  layers: L.Layer[] =[];

  generateLegend(arr: string[]) {
    return chroma.scale(arr).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10);
  }
  updateLayers(layer: L.Layer) {
    // for only one layer card
    if (this.layers.length > 0) {
      this.layers.pop();
      this.layers.push(layer);
    } else {
      this.layers.push(layer);
    }
  }
}
