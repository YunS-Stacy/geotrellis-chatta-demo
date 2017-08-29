import { Component, Input, OnInit } from '@angular/core';

import { LayerService } from './services/layer.service';

@Component({
  selector: 'gd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LayerService]
})

export class AppComponent implements OnInit {
  @Input() lmWeights: number[] = [2, -1, -2];
  isCollapsed = false;
  options = {
    layers: [
      L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
      })
    ],
    zoom: 11,
    center: L.latLng([39.992114502787494, -75.13412475585939])
  };
  layers: L.Layer[] = [];
  constructor(private layerService: LayerService) {
    this.layerService.getLayer(this.lmWeights)
        .subscribe(res => {
          this.layers.push(
            L.tileLayer.wms('https://geotrellis.io/gt/weighted-overlay/wms', {
              breaks: res,
              layers: ['philly_bars', 'philly_grocery_stores', 'philly_rail_stops'].join(),
              format: 'image/png',
              weights: this.lmWeights,
              transparent: true,
              attribution: 'Azavea',
              uppercase: true,
              opacity: 0.6
            })
          );
        },
        console.error
    );
  }

  ngOnInit () {

  }
  updateLM(weights: number[]) {
    this.lmWeights = weights;
    console.log(this.lmWeights);
    this.layerService.getLayer(this.lmWeights).subscribe(res => {
      this.layers.pop();
      this.layers.push(
        L.tileLayer.wms('https://geotrellis.io/gt/weighted-overlay/wms', {
          breaks: res,
          layers: ['philly_bars', 'philly_grocery_stores', 'philly_rail_stops'].join(),
          format: 'image/png',
          weights: this.lmWeights,
          transparent: true,
          attribution: 'Azavea',
          uppercase: true,
          opacity: 0.4
        })
      );
    },
    console.error
);
  }
}
