import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LayerService {
  private _url = 'https://geotrellis.io/gt/weighted-overlay/breaks?layers=philly_bars,philly_grocery_stores,philly_rail_stops&weights=1,0,-2&numBreaks=20';

  constructor(private _http: Http) { }
  getLayer() {
    return this._http.get('https://geotrellis.io/gt/weighted-overlay/breaks?layers=philly_bars,philly_grocery_stores,philly_rail_stops&weights=1,0,-2&numBreaks=20')
      .map(response => response.json());
  }
}
