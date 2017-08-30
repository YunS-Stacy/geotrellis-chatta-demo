import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'gd-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss']
})
export class SidebarHeaderComponent {
  @HostBinding('class.-collapsed') @Input() isCollapsed = false;
  @Output() isCollapsedChange = new EventEmitter<boolean>();

  resizeSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedChange.emit(this.isCollapsed);
  }
  constructor() { }

}
