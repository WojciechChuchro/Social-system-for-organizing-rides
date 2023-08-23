import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesLibraryComponent } from './styles-library.component';

describe('StylesLibraryComponent', () => {
  let component: StylesLibraryComponent;
  let fixture: ComponentFixture<StylesLibraryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StylesLibraryComponent]
    });
    fixture = TestBed.createComponent(StylesLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
