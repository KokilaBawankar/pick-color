import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickColorModalPage } from './pick-color-modal.page';

describe('PickColorModalPage', () => {
  let component: PickColorModalPage;
  let fixture: ComponentFixture<PickColorModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickColorModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickColorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
