import { ChangeDetectorRef, Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';

@Component({
  selector: 'gd-map-view',
  templateUrl: './map-view.component.html'
})
export class MapViewComponent implements AfterViewInit {

  mapIns: L.Map;
  map: L.Map;
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

  // testing message
  onMapReady(mapWrapper: L.Map): void {
    // mapWrapper.createPane('lm');
    console.log('map ready');
    // this.map = mapWrapper;
  }

  constructor(
    private _cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this._cd.detectChanges();
  }
}
