import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciasFamiliaresComponent } from './referencias-familiares.component';

describe('ReferenciasFamiliaresComponent', () => {
  let component: ReferenciasFamiliaresComponent;
  let fixture: ComponentFixture<ReferenciasFamiliaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReferenciasFamiliaresComponent]
    });
    fixture = TestBed.createComponent(ReferenciasFamiliaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
