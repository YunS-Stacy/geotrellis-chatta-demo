import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';


@Injectable()
export class LayerService {

  constructor(private http: Http) { }

  getLayer(weights: number[]) {
    return this.http.get(`https://geotrellis.io/gt/weighted-overlay/breaks?layers=philly_bars,philly_grocery_stores,philly_rail_stops&weights=${weights}&numBreaks=20`)
      .retry(3)
      .map(response => response.json()['classBreaks']);
  }
}