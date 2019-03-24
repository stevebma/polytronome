import {Bar} from './bar';
import {TimeSignature} from './time-signature';
import {Beat} from './beat';
import {Note} from './note.enum';

export class Layer {

  index: number;
  _time: TimeSignature;
  bars: Bar[] = [];

  constructor(index: number, timeSignature: TimeSignature, bars: Bar[]) {
    this.index = index;
    this.time = timeSignature;
    this.bars = bars;
  }

  getStaveNotes(scale: number, key: string): Vex.Flow.StaveNote[] {
    let notes = [];
    this.bars.forEach((bar: Bar) => {
      const duration: string = this.time.lower.toString();
      notes = notes.concat(bar.getStaveNotes(scale, duration, key));
    });
    return notes;
  }

  isEqualTo(other: Layer): boolean {
    if (!other.time.isEqualTo(this.time)) {
      return false;
    }
    this.bars.forEach( (bar: Bar, index: number) => {
      if (!other.bars[index].isEqualTo(bar)) {
          return false;
      }
    });
    return true;
  }

  public extend() {
    this.bars.push(Bar.blank(this.size, this.time.upper));
  }

  public reduce() {
    this.bars.pop();
  }

  get size(): number {
    return this.bars.length;
  }

  public numBeats(): number {
    return this.bars.length * this.time.upper;
  }

  get time(): TimeSignature {
    return this._time;
  }

  set time(value: TimeSignature) {
    this._time = value;
    this.bars.forEach( (bar: Bar) => {
      bar.length = value.upper;
    });
  }
}
