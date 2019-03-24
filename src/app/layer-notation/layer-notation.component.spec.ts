import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerNotationComponent } from './layer-notation.component';

describe('LayerNotationComponent', () => {
  let component: LayerNotationComponent;
  let fixture: ComponentFixture<LayerNotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerNotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
