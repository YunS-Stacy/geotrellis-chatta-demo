import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LeafletModule } from '@asymmetrik/angular2-leaflet';

import { AppComponent } from './app.component';
import { MapContainerComponent } from './map-container/map-container.component';
import { SidebarSectionComponent } from './sidebar-section/sidebar-section.component';
import { SidebarHeaderComponent } from './sidebar-section/sidebar-header/sidebar-header.component';
import { LayerCardListComponent } from './sidebar-section/layer-card-list/layer-card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MapContainerComponent,
    SidebarSectionComponent,
    SidebarHeaderComponent,
    LayerCardListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LeafletModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
