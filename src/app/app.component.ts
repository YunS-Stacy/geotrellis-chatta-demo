import { ChangeDetectorRef, Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';

@Component({
  selector: 'gd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements AfterViewInit {
  @Output() getMap = new EventEmitter<L.Map>();
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

  onMapReady(mapWrapper: L.Map) {
    mapWrapper.createPane('lm');
    this.map = mapWrapper;
  }

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
