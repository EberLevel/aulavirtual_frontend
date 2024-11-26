import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanesEstudioComponent } from './list-planes-estudio.component';

describe('ListPlanesEstudioComponent', () => {
  let component: ListPlanesEstudioComponent;
  let fixture: ComponentFixture<ListPlanesEstudioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPlanesEstudioComponent]
    });
    fixture = TestBed.createComponent(ListPlanesEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
