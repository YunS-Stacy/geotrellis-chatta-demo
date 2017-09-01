import { Directive, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import * as turf from '@turf/turf';
import * as L from 'leaflet';
import 'leaflet-draw';


import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';
@Directive({
  selector: '[gdMapDraw]'
})
export class MapDrawDirective implements OnChanges, OnInit {

  leafletDirective: LeafletDirectiveWrapper;

  drawControl: L.Control.Draw;
  featureGroup: L.FeatureGroup;

  @Input() drawOptions: L.Control.DrawConstructorOptions = null;

  constructor(leafletDirective: LeafletDirective) {
    this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
  }

  ngOnInit() {
    this.leafletDirective.init();

    // Initialize the draw options (in case they weren't provided)
    this.drawOptions = this.initializeDrawOptions(this.drawOptions);

    // Create the control
    this.drawControl =  new L.Control.Draw(this.drawOptions);

    // Pull out the feature group for convenience
    this.featureGroup = this.drawOptions.edit.featureGroup;

    // Add the control to the map
    this.leafletDirective.getMap().addControl(this.drawControl);

    // Register the main handler for events coming from the draw plugin
    this.leafletDirective.getMap().on(L.Draw.Event.CREATED, (e: any) => {
      const layer: L.Layer = (e as L.DrawEvents.Created).layer;
      this.featureGroup.addLayer(layer);
      console.log(this.featureGroup.toGeoJSON());
      console.log(this.featureGroup);

    });
  }

  ngOnDestroy() {
    this.leafletDirective.getMap().removeControl(this.drawControl);
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    // No changes being handled currently
  }

  initializeDrawOptions(options: L.Control.DrawConstructorOptions) {

    // Ensure the options have a featureGroup
    if (null == options) {
      options = {
        edit: null
      };
    }
    if (null == options.edit) {
      options.edit = {
        featureGroup: null
      };
    }
    if (null == options.edit.featureGroup) {
      // No feature group was provided, so we're going to add it ourselves
      options.edit.featureGroup = L.featureGroup();
      this.leafletDirective.getMap().addLayer(options.edit.featureGroup);
    }

    return options;
  }
    
}