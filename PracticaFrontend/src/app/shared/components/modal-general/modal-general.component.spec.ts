import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGeneralComponent } from './modal-general.component';

describe('ModalGeneralComponent', () => {
  let component: ModalGeneralComponent;
  let fixture: ComponentFixture<ModalGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalGeneralComponent]
    });
    fixture = TestBed.createComponent(ModalGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
