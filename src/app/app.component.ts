import { Component } from '@angular/core';

import { LayerService } from './layer.service';

@Component({
  selector: 'gd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LayerService]
})

export class AppComponent {
  layer: JSON;
  breaks: Array<number>;
  isCollapsed = false;
  options = {
    layers: [
      L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd',
        maxZoom: 19
      })
    ],
    zoom: 14,
    center: L.latLng([39.952583, -75.165222])
  };
  layers: Array<Object> = [];
  constructor(layerService: LayerService) {
    layerService.getLayer()
        .subscribe(
        res => {
          this.breaks = res.classBreaks; console.log(res);
          this.layers.push(
            L.tileLayer.wms('https://geotrellis.io/gt/weighted-overlay/wms', {
              breaks: res.classBreaks,
              layers: ['philly_bars', 'philly_grocery_stores', 'philly_rail_stops'].join(),
              format: 'image/png',
              weights: [2, -1, -2],
              transparent: true,
              attribution: 'Azavea',
              // important leaflet version change (default: uppercase: false)
              uppercase: true,
              opacity: 0.6
            })
          );
        },
        console.error,
        () => console.log('Completed!')
    );
  }

}
