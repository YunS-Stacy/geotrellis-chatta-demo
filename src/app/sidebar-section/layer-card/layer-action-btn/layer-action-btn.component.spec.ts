import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerActionBtnComponent } from './layer-action-btn.component';

describe('LayerActionBtnComponent', () => {
  let component: LayerActionBtnComponent;
  let fixture: ComponentFixture<LayerActionBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerActionBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerActionBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
