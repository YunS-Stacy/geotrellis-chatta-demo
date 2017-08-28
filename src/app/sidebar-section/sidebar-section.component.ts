import { Component, OnInit } from '@angular/core';
import * as chroma from 'chroma-js';

@Component({
  selector: 'gd-sidebar-section',
  templateUrl: './sidebar-section.component.html',
  styleUrls: ['./sidebar-section.component.scss']
})
export class SidebarSectionComponent implements OnInit {
  collapsed: false;

  colorArray: string[] = ['#A65034', '#E3D3C2', '#D0DBE1', '#5891C1'];

  colorPalette: string[];

  generateLegend(arr: string[]) {
      return chroma.scale(arr).mode('lab').domain([0, 0.5, 0.6, 1]).colors(10);
  }

  ngOnInit() {
    this.colorPalette = this.generateLegend(this.colorArray);
    console.log(this.colorPalette);
  }

}
