import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import * as chroma from 'chroma-js';

@Component({
  selector: 'gd-layer-card',
  templateUrl: './layer-card.component.html',
  styleUrls: ['./layer-card.component.scss']
})
export class LayerCardComponent implements OnInit {
  @ViewChild('btnInfo') btnInfo;

  colorArray: string[] = ['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1'];
  colorPalette: string[];

  infoPanel = false;
  weightPanel = false;
  opacityPanel = false;

  expandPanel(e) {
    this[`${e.class}Panel`] = e.isClicked;
    if (e.class === 'weight' && e.isClicked) {
      console.log(`select custom value`);
    }
  }

  constructor() { }

  ngOnInit() {
    this.colorPalette = chroma.scale(this.colorArray).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10);
  }

}
