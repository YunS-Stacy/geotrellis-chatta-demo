import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gd-sidebar-section',
  templateUrl: './sidebar-section.component.html',
  styleUrls: ['./sidebar-section.component.scss']
})
export class SidebarSectionComponent implements OnInit {
  collapsed: false;
  constructor() { }

  ngOnInit() {
  }

}
