import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

import { AppComponent } from './app.component';
import { MapContainerComponent } from './pages/map-view/map-container/map-container.component';
import { SidebarSectionComponent } from './pages/map-view/sidebar-section/sidebar-section.component';
import { SidebarHeaderComponent } from './pages/map-view/sidebar-section/sidebar-header/sidebar-header.component';
import { LayerCardComponent } from './pages/map-view/sidebar-section/layer-card/layer-card.component';

import { ButtonDirective } from './directives/button.directive';
import { RejoinPipe } from './pipes/rejoin.pipe';
import { ParamItemComponent } from './pages/map-view/sidebar-section/layer-card/param-item/param-item.component';
import { MapViewComponent } from './pages/map-view/map-view.component';
import { DrawComponent } from './pages/map-view/draw/draw.component';
import { MapDrawDirective } from './directives/map-draw.directive';

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
    MapViewComponent,
    DrawComponent,
    MapDrawDirective,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
