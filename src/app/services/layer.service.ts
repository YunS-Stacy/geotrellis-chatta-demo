import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/debounceTime';



@Injectable()
export class LayerService {

  constructor(private _http: Http) { }

  getLayer(weights: number[]) {
    return this._http.get(`https://geotrellis.io/gt/weighted-overlay/breaks?layers=philly_bars,philly_grocery_stores,philly_rail_stops&weights=${weights}&numBreaks=20`)
      .debounceTime(1000)
      .retry(3)
      .map(response => response.json()['classBreaks']);
  }
}
