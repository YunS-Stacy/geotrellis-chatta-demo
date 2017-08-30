import { Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, ViewChild } from '@angular/core';
import * as chroma from 'chroma-js';

@Component({
  selector: 'gd-sidebar-section',
  templateUrl: './sidebar-section.component.html',
  styleUrls: ['./sidebar-section.component.scss']
})
export class SidebarSectionComponent {
  @Input() map: L.Map;

  lmLayer: L.Layer;
  lmOpacity = 0.6;
  isCollapsed = false;

  layersObj = {
    lm: new L.Layer
  };
  layers: L.Layer[] = [];

  forceMapResize(): void {
    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

  updateLayers(layer: L.Layer) {
    this.layersObj.lm = layer;
    this.layers = Object.values(this.layersObj);
  }

  updateLMOpacity(opacity: number) {

    this.rd.setStyle(this.map.getPane('lm'), 'opacity', opacity);
  }


  constructor(
    private rd: Renderer2
  ) {

  }


}
