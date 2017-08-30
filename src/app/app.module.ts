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
import { CheckboxDirective } from './directives/checkbox.directive';
import { LayerActionBtnComponent } from './sidebar-section/layer-card/layer-action-btn/layer-action-btn.component';
import { ReplacePipe } from './pipes/replace.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MapContainerComponent,
    SidebarSectionComponent,
    SidebarHeaderComponent,
    LayerCardComponent,
    ButtonDirective,
    CheckboxDirective,
    LayerActionBtnComponent,
    ReplacePipe,
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
