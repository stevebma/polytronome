import type Vex from 'vexflow';

import { Bar } from './bar';
import { TimeSignature } from './time-signature';

export class Layer {
    index: number;
    _time: TimeSignature;
    bars: Array<Bar> = [];

    constructor(index: number, timeSignature: TimeSignature, bars: Bar[]) {
        this.index = index;
        this._time = timeSignature;
        this.time = timeSignature;
        this.bars = bars;
    }

    static clone(other: Layer): Layer {
        return new Layer(other.index, new TimeSignature(other._time.upper, other._time.lower), other.bars.slice());
    }

    static create44(index = 0): Layer {
        return new Layer(index, new TimeSignature(4, 4), [new Bar(1, [1, 1, 1, 1])]);
    }

    getStaveNotes(scale: number, key: string, _duration?: string): Vex.Flow.StaveNote[] {
        let notes: Vex.Flow.StaveNote[] = [];
        this.bars.forEach((bar: Bar) => {
            const duration: string = _duration ? _duration : this.time.lower.toString();
            notes = notes.concat(bar.getStaveNotes(scale, duration, key));
        });
        return notes;
    }

    isEqualTo(other: Layer): boolean {
        if (!other.time.isEqualTo(this.time)) {
            return false;
        }
        this.bars.forEach((bar: Bar, index: number) => {
            if (!other.bars[index].isEqualTo(bar)) {
                return false;
            }
        });
        return true;
    }

    public extend(): Layer {
        this.bars.push(Bar.blank(this.size, this.time.upper));
        return this;
    }

    public shrink(): Layer {
        this.bars.pop();
        return this;
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
        this.bars.forEach((bar: Bar) => {
            bar.length = value.upper;
        });
    }

    transformTo(otherTime: TimeSignature): string[] {
        const scale = otherTime.upper / this.time.upper;
        return this.bars.flatMap(bar => bar.stretchToArray(scale));
    }
    // toArray(): string[] {
    //     return this.bars.flatMap(bar => bar.toArray());
    // }
}
