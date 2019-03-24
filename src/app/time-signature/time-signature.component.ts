
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TimeSignature} from '../time-signature';

@Component({
  selector: 'app-time-signature',
  templateUrl: './time-signature.component.html',
  styleUrls: ['./time-signature.component.css']
})
export class TimeSignatureComponent implements OnInit {

  @Input() time: TimeSignature;
  @Input() disabled: boolean;

  @Output() changed = new EventEmitter<TimeSignature>();

  constructor() { }

  ngOnInit() {
  }

  valueChange(event) {
    console.log(event);
    this.changed.emit(this.time);
  }

  setLower(value: number) {
    this.time.lower = value;
    this.changed.emit(this.time);
  }

}
