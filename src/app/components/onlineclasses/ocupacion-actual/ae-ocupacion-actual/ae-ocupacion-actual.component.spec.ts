import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeOcupacionActualComponent } from './ae-ocupacion-actual.component';

describe('AeOcupacionActualComponent', () => {
  let component: AeOcupacionActualComponent;
  let fixture: ComponentFixture<AeOcupacionActualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AeOcupacionActualComponent]
    });
    fixture = TestBed.createComponent(AeOcupacionActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
