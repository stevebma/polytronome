import {NoteValue} from './note-value.enum';

export class TimeSignature {

  upper: number;
  lower: NoteValue;

  constructor(upper: number, lower: number) {
    this.upper = upper;
    this.lower = lower;
  }

  isEqualTo(other: TimeSignature): boolean {
    return (other.upper === this.upper && other.lower === this.lower);
  }

  toString(): string {
    return `${this.upper}/${this.lower}`;
  }

}
