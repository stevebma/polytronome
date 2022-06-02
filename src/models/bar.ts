import Vex from 'vexflow';

import { Beat } from './beat';
import { Note } from './note.enum';

export class Bar {
    index: number;
    beats: Beat[];

    constructor(index: number, notes: number[]) {
        this.index = index;
        this.beats = [];
        notes.forEach((note, beatIndex) => {
            this.beats.push(new Beat(beatIndex, note as Note));
        });
    }

    static blank(index: number, length: number): Bar {
        return new Bar(index, Array(length).fill(Note.Rest));
    }

    isEqualTo(other: Bar): boolean {
        if (other.length !== this.length) {
            return false;
        }
        this.beats.forEach((beat: Beat, index: number) => {
            if (!other.beats[index].isEqualTo(beat)) {
                return false;
            }
        });
        return true;
    }

    getStaveNotes(scale: number, duration: string, key: string, color = 'black'): Array<Vex.Flow.StaveNote> {
        const makeRest = () => {
            return new Vex.Flow.StaveNote({
                clef: 'percussion',
                keys: [key],
                duration: duration + 'r',
                stem_direction: 1, // up
            });
        };
        const notes: Vex.Flow.StaveNote[] = [];
        for (let index = 0; index < this.length * scale; index++) {
            notes.push(makeRest());
        }

        this.beats.forEach((beat: Beat, index: number) => {
            const note: Vex.Flow.StaveNote = new Vex.Flow.StaveNote({
                clef: 'percussion',
                keys: [key],
                duration: `${duration}${beat.note === Note.Rest ? 'r' : ''}`,
                stem_direction: 1, // up
            });
            if (beat.note === Note.Accent) {
                // add marcato articulation, positioned above the note
                const marcato = new Vex.Flow.Articulation('a^').setPosition(Vex.Flow.Modifier.Position.ABOVE);
                note.addArticulation(0, marcato);
            }
            note.setStyle({ fillStyle: color, strokeStyle: color });
            notes[index * scale] = note;
        });

        return notes;
    }

    get length(): number {
        return this.beats.length;
    }

    set length(value: number) {
        const diff: number = value - this.length;
        if (diff < 0) {
            this.beats = this.beats.slice(0, value);
        } else {
            for (let index: number = this.length; index < value; index++) {
                this.beats.push(new Beat(index, Note.Play));
            }
        }
    }

    stretchToArray(factor: number): string[] {
        const scale = Math.floor(factor);
        const result: string[] = new Array<string>(this.length * scale).fill(Note.Rest.toString());
        this.beats.map((beat, index) => (result[index * scale] = beat.note.toString()));
        return result;
    }
}
