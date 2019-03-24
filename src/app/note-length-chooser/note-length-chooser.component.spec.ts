import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteLengthChooserComponent } from './note-length-chooser.component';

describe('NoteLengthChooserComponent', () => {
  let component: NoteLengthChooserComponent;
  let fixture: ComponentFixture<NoteLengthChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteLengthChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteLengthChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
