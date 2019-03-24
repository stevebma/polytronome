import {Component, OnInit, OnChanges, DoCheck, SimpleChanges, Input, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import 'vexflow';
import {Layer} from '../layer';
import {Observable} from 'rxjs';
import {Bar} from '../bar';
import {Note} from '../note.enum'
import {Beat} from '../beat';

@Component({
  selector: 'app-layer-notation',
  templateUrl: './layer-notation.component.html',
  styleUrls: ['./layer-notation.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayerNotationComponent implements OnInit, DoCheck { //}, OnChanges {

  @Input() layer: Layer;
  previous: Layer;
  //layer: Layer;
  // _data: any;
  //@Input() observable: Observable<Layer>;
  @ViewChild('notation') notation;
  renderer: Vex.Flow.Renderer;

  // constructor(private cd: ChangeDetectorRef) {
  //   //this.cd = cd;
  // }

  ngOnInit() {
    this.previous = <Layer>(JSON.parse(JSON.stringify(this.layer)));
    //this.previous = Object.assign({}, this.layer);

    // this.observable.subscribe(layer => {
    //     console.log('layer changed');
    //     this.layer = null;
    //     this.layer = layer;
    //     // this.cd.markForCheck();
    //     // this.cd.detectChanges();
    //     this.render();
    // });
    // musical notation using vexflow
    // Create an SVG renderer and attach it to the DIV element
    this.renderer = new Vex.Flow.Renderer(this.notation.nativeElement, Vex.Flow.Renderer.Backends.SVG);

    // Size our svg:
    this.renderer.resize(1024, 150);
    this.render();
  }

  ngDoCheck(): void {
    // console.log('ngDoCheck');
    // console.log(this.layer);
    // if (this.previous.isEqualTo(this.layer)) {
    //   return;
    // }
        //   this.previous = JSON.parse(JSON.stringify(this.layer));
    this.render();
        // }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.render();
    console.log('LayerNotationComponent.ngOnChanges');
  }

  render() {

    if (!this.renderer) {
      return;
    }

    console.log('rendering notation');

       // And get a drawing context:
    let context = this.renderer.getContext();

    context.clear();

    // Create a stave at position 10, 40 of width 400 on the canvas.
    let stave = new Vex.Flow.Stave(0, 0, 1024);

    // Add a clef and time signature.
    stave.addClef('percussion').addTimeSignature(this.layer.time.toString());
    stave.setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);
    stave.setEndBarType(Vex.Flow.Barline.type.REPEAT_END);
    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    let notes = [];

    this.layer.bars.forEach( (bar: Bar, index: number) => {

      const duration: string =  this.layer.time.lower.toString();
      let barNotes = bar.getStaveNotes(1, duration, 'b/4');
      notes = notes.concat(barNotes);

      // render a barline for all except the final bar
      if (index < this.layer.bars.length - 1) {
        notes.push(new Vex.Flow.BarNote());
      }
    });

    // Create a voice in the layers time signature and add above notes
    // const voice = new Vex.Flow.Voice({num_beats: this.layer.time.upper * this.layer.size,  beat_value: this.layer.time.lower});
    // voice.addTickables(notes);
    //voice.setStave(stave);

    Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);

    // Format and justify the notes to given width in pixels.
    //const formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 1024, {align_rests: false, context: context});

    // Render voice
    //voice.draw(context, stave);
  }
}
