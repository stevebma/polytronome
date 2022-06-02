import { Note } from './Note';

export class Beat {
    index: number;
    note: Note;

    constructor(index: number, note: Note) {
        this.index = index;
        this.note = note;
    }

    isEqualTo(other: Beat): boolean {
        return other.index === this.index && other.note === this.note;
    }

    toggle(value: Note = Note.Play): void {
        this.note = this.note === Note.Rest ? value : Note.Rest;
    }
}
