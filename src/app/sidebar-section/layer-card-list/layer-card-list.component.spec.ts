import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerCardListComponent } from './layer-card-list.component';

describe('LayerCardListComponent', () => {
  let component: LayerCardListComponent;
  let fixture: ComponentFixture<LayerCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
