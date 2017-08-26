import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gd-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss']
})
export class MapContainerComponent implements OnInit {
  @Input() breaks: Array<number>;
  constructor() { }

  ngOnInit() {
  }

}