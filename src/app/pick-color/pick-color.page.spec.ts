import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickColorPage } from './pick-color.page';

describe('PickColorPage', () => {
  let component: PickColorPage;
  let fixture: ComponentFixture<PickColorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickColorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickColorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
