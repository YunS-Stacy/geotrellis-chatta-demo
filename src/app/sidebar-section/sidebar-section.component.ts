import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, OnChanges, Output, Renderer2, ViewChild } from '@angular/core';
import * as chroma from 'chroma-js';
import { LayerService } from '../services/layer.service';


@Component({
  selector: 'gd-sidebar-section',
  templateUrl: './sidebar-section.component.html',
  providers: [LayerService]
})
export class SidebarSectionComponent implements OnChanges {
  @Input() map: L.Map;
  isCollapsed = false;

  showLM = true;
  opacityLM = 0.6;
  weightsLM: number[] = [3, -3, 0];
  paramsLM: string[] = ['philly_bars', 'philly_grocery_stores', 'philly_rail_stops'];
  layerLM: L.Layer = new L.Layer;

  lmModel: {
    show: boolean,
    opacity: number,
    weights: number[],
    params: string[],
    layer: L.Layer
  };
  layersObj: {
    lm: L.Layer
  } = {
    lm: new L.Layer
  };

  layers: L.Layer[] = [];

  forceMapResize(): void {
    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

  updateLayers(layer: L.Layer) {
    this.lmModel.layer = layer;
    this.layers = [this.lmModel.layer];
  }

  onOpacityChange(opacity: number, name: string) {
    switch (name) {
      case 'lm':
        this._rd.setStyle(this.map.getPane(name), 'opacity', this.opacityLM);
        break;
      default:
        break;
    }
  }

  onShowChange(show: boolean, name: string) {
    const visible = show ? 'visible' : 'hidden';
    switch (name) {
      case 'lm':
        this._rd.setStyle(this.map.getPane(name), 'visibility', visible);
        break;
      default:
        break;
    }
  }

  onWeightsChange(layer: L.Layer, name: string) {
    switch (name) {
      case 'lm':
        this._layerService.getLayer(this.weightsLM).subscribe(res => {
          this.layersObj.lm = L.tileLayer.wms('https://geotrellis.io/gt/weighted-overlay/wms', {
            breaks: res,
            layers: this.paramsLM.join(),
            format: 'image/png',
            weights: this.weightsLM,
            transparent: true,
            attribution: 'Azavea',
            uppercase: true,
            opacity: 1,
            pane: 'lm'
          });
          this.layers = Object.values(this.layersObj);
        }, console.error);
        this.onOpacityChange(this.opacityLM, 'lm');
        break;
      default:
        break;
    }
  }

  constructor(
    private _el: ElementRef,
    private _rd: Renderer2,
    private _layerService: LayerService
  ) {}

  ngOnChanges(changes) {
    if (changes.map.currentValue !== undefined) {
      this.map.createPane('lm');
      this._layerService.getLayer(this.weightsLM).subscribe(res => {
        this.layersObj.lm = L.tileLayer.wms('https://geotrellis.io/gt/weighted-overlay/wms', {
          breaks: res,
          layers: this.paramsLM.join(),
          format: 'image/png',
          weights: this.weightsLM,
          transparent: true,
          attribution: 'Azavea',
          uppercase: true,
          opacity: 1,
          pane: 'lm'
        });
        this.layers = Object.values(this.layersObj);
      }, console.error);
      this.onOpacityChange(this.opacityLM, 'lm');

    }
  }
}
