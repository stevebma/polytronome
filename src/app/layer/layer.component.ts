import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Layer} from '../layer';
import {TimeSignature} from '../time-signature';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css'],
})
export class LayerComponent {

  @Input() layer: Layer;
  @Input() isMutable: boolean;
  //@Output() changed = new EventEmitter<Layer>();

  constructor() {
    this.isMutable = true;
  }

  onExtendClick() {
    this.layer.extend();
  }

  onReduceClick() {
    this.layer.reduce();
  }

  onTimeSignatureChanged(time: TimeSignature) {
    this.layer.time = time;//new TimeSignature(time.upper, time.lower);
  }

  colClass(): string {
    //var width: number = Math.round(12 / this.layer.size);
    return 'col';// `col-${width}`;
  }

}
