import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarSectionComponent } from './sidebar-section.component';

describe('SidebarSectionComponent', () => {
  let component: SidebarSectionComponent;
  let fixture: ComponentFixture<SidebarSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});