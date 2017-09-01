import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { MapContainerComponent } from './map-container/map-container.component';
import { SidebarSectionComponent } from './sidebar-section/sidebar-section.component';
import { SidebarHeaderComponent } from './sidebar-section/sidebar-header/sidebar-header.component';
import { LayerCardComponent } from './sidebar-section/layer-card/layer-card.component';

import { ButtonDirective } from './directives/button.directive';
import { RejoinPipe } from './pipes/rejoin.pipe';
import { ParamItemComponent } from './sidebar-section/layer-card/param-item/param-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MapContainerComponent,
    SidebarSectionComponent,
    SidebarHeaderComponent,
    LayerCardComponent,
    ButtonDirective,
    RejoinPipe,
    ParamItemComponent,
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
