import { Component, OnInit } from '@angular/core';
import * as chroma from 'chroma-js';

@Component({
  selector: 'gd-layer-card',
  templateUrl: './layer-card.component.html',
  styleUrls: ['./layer-card.component.scss']
})
export class LayerCardComponent implements OnInit {


  colorArray: string[] = ['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1'];

  colorPalette: string[];

  constructor() { }

  ngOnInit() {
    this.colorPalette = chroma.scale(this.colorArray).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10);
  }

}
