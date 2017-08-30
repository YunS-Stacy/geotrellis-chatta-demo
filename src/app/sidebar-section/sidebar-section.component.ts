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

  layersObj = {
    lm: new L.Layer
  };
  layers: L.Layer[] = [];

  updateLayers(layer: L.Layer) {
    this.layersObj.lm = layer;
    this.layers = Object.values(this.layersObj);
  }
}
