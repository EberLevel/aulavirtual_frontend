import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeReferenciasFamiliaresComponent } from './ae-referencias-familiares.component';

describe('AeReferenciasFamiliaresComponent', () => {
  let component: AeReferenciasFamiliaresComponent;
  let fixture: ComponentFixture<AeReferenciasFamiliaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeReferenciasFamiliaresComponent]
    });
    fixture = TestBed.createComponent(AeReferenciasFamiliaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
