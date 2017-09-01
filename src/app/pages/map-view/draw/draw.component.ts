import { Component, OnInit, OnChanges } from '@angular/core';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';

import * as turf from '@turf/turf';


@Component({
    selector: 'gd-draw',
    templateUrl: './draw.component.html',
    providers: [LeafletDirective]
})
export class DrawComponent implements OnInit, OnChanges {
    options = {
        layers: [
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
        ],
        zoom: 5,
        center: L.latLng({ lat: 46.879966, lng: -121.726909 })
    };

    drawOptions = {
        position: 'topright',
        draw: {
            marker: false,
            circle: false,
            rectangle: false,
            circlemarker: false,
            polyline: false,
        }
    };

    constructor(
        private leafletDirective: LeafletDirective
    ) { }


    ngOnInit() {
        // this.leafletDirective.ngOnInit();
        console.log('init map');
    }

    ngOnChanges(changes) {
        console.log(changes);
    }
}
