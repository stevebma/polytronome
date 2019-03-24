import {Component, Input, OnInit, OnChanges, ViewChild, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css']
})
export class SingleNoteComponent implements OnInit {

  @Input() duration: number;
  @Input() label: string;
  @ViewChild('wrapper') wrapper;
  private renderer: Vex.Flow.Renderer;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.draw();
  }

  draw() {
    const width: number = 50;
    const height: number = 75;
    if (!this.renderer) {
      this.renderer = new Vex.Flow.Renderer(this.wrapper.nativeElement, Vex.Flow.Renderer.Backends.SVG);
    }
    this.renderer.resize(width, height);
    let context = this.renderer.getContext();
    context.clear();
    let stave = new Vex.Flow.Stave(0, -10, width);
    let note = new Vex.Flow.StaveNote({keys: ['b/4'], duration: this.duration.toString(), stem_direction: 1});
    let voice = new Vex.Flow.Voice({num_beats: 1, beat_value: this.duration});
    voice.addTickables([note]);
    let formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], width);
    voice.draw(context, stave);
  }
}
