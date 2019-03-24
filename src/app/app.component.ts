import {Component, Input, OnInit, OnChanges, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Layer} from './layer';
import {TimeSignature} from './time-signature';
import {Bar} from './bar';
import {Player, Players, Volume, Sequence, Synth, SynthOptions, Transport, Part, Panner, Encoding, TimeEventObject, PlayersOptions} from 'tone';
import 'vexflow';
import {BehaviorSubject} from 'rxjs';
import {MathUtils} from './utils/math-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'Polytronome';

  @ViewChild('combinedNotation') combinedNotation;
  layers: Layer[];
  commonLayer: Layer = null;
  combinedNotes: Array<Vex.Flow.StaveNote>;
  layerObservables: Array<BehaviorSubject<Layer>> = [];
  bpm = new FormControl('100');
  playbackStatus: boolean;

  player: Tone.Player = null;
  sourceA: Tone.Players = null;
  sourceB: Tone.Players = null;
  left: Tone.Panner = null;
  right: Tone.Panner = null;
  centered: Tone.Panner = null;
  part: Part;
  bpmFactor: number = 1;

  loopA: Tone.Sequence = null;
  loopB: Tone.Sequence = null;

  beepA: Tone.Synth = null;
  beepB: Tone.Synth = null;

  constructor() {
    this.layers = [];
    this.playbackStatus = false;
  }

  updateCommonLayer() {

    let renderer = new Vex.Flow.Renderer(this.combinedNotation.nativeElement, Vex.Flow.Renderer.Backends.SVG);
    renderer.resize(1024, 100);

     // And get a drawing context:
    let context =  renderer.getContext();

    context.clear();

    let upper = MathUtils.lcm(this.layers[0].time.upper, this.layers[1].time.upper);
    let lower = MathUtils.lcm(this.layers[0].time.lower, this.layers[1].time.lower);

    let commonTime = new TimeSignature(upper, lower);

    console.log('common timne:' + commonTime);

    // Create a stave at position 10, 40 of width 400 on the canvas.
    let stave = new Vex.Flow.Stave(0, 0, 1024);

    // Add a clef and time signature.
    stave.addClef('percussion').addTimeSignature(commonTime.toString());
    stave.setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);
    stave.setEndBarType(Vex.Flow.Barline.type.REPEAT_END);
    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    let voices  = [];
    let keys = ['e/4', 'g/5', 'b/4'];

   // this.layers.forEach( (layer: Layer, index: number) => {

      let layer = this.layers[0];
      const scaling: number = upper / layer.time.upper;
      console.log('scaling ' + scaling);
      const notes = layer.getStaveNotes(scaling, keys[0]);
      console.log(notes)
      Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);

      // const scale: number = upper % layer.time.upper;
      // const notes = layer.getStaveNotes(scale, '4');
      //
      // layer.bars.forEach( (bar: Bar, index: number) => {}

   // });
  }

  updateTempo() {
    Transport.bpm.value = this.bpm.value * this.bpmFactor;
  }

  togglePlayback() {

    this.playbackStatus = !this.playbackStatus;

    this.layers.forEach((layer: Layer) => {
      console.log(layer);
      //layer.isMutable = !this.playbackStatus;
    });

    if (this.playbackStatus) {

        // check if context is in suspended state (autoplay policy)
        // if (this.audioCtx.state === 'suspended') {
        //   this.audioCtx.resume();
        // }

        // this.player.start();
        console.log('starting!');

       // this.part = new Part( (time, value) => {
       //    //the value is an object which contains both the note and the velocity
       //    console.log('time: ' + time + ' value: ' + value);
       //    let velocity = 1;
       //    this.sourceA.get('klack').start(time, 0, "1n");//, 0, velocity)
       //
       //    //synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
       //  }, [{"time" : 0, "note" : "C3", "velocity": 0.9},
       //              {"time" : "0:2", "note" : "C4", "velocity": 0.5}]);//.start(0);
       //
       //  this.part.loop = true;
       //  this.part.start(0);
        //use an array of objects as long as the object has a "time" attribute
        // this.part = new Part( (time, value) => {
        //   //the value is an object which contains both the note and the velocity
        //   console.log('time: ' + time + ' value: ' + value);
        //
        //   //synth.triggerAttackRelease(value.note, "8n", time, value.velocity);
        // }, [{"time" : 0, "note" : "C3", "velocity": 0.9},
        //      {"time" : "0:2", "note" : "C4", "velocity": 0.5}
        // ]).start(0);

        // // // nice experiment, 3 over 4
        // Transport.timeSignature = [12, 4];
        // this.loopA = new Sequence((time, sample) => {
        //
        //   console.log('A: time: ' + time + ' sample: ' + sample);
        //   this.sourceA.get(sample).start(time,)
        //
        // }, ['2', '2', '2'], "4n").start(0);
        //
        // this.loopB = new Sequence((time, sample) => {
        //
        //   console.log('B: time: ' + time + ' sample: ' + sample);
        //   this.sourceA.get(sample).start(time,)
        //
        // }, ['1', '1', '1', '1'], "3n").start(0);
        // Transport.start();

        // // nice experiment, 5 over 4
        this.bpmFactor = 5;
        this.updateTempo();
        Transport.timeSignature = 20;// [20, 4];
        this.loopA = new Sequence((time, sample) => {

          //console.log('A: time: ' + time + ' sample: ' + sample);
          if (sample !== '0') {
            this.beepA.triggerAttack('G5', time, 1);
            //this.sourceA.get(sample).start(time);
          }

        }, ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0'], '4n').start(0);

        this.loopB = new Sequence((time, sample) => {

          //console.log('B: time: ' + time + ' sample: ' + sample);
          // if (sample !== '0') {
          //   this.sourceB.get(sample).start(time);
          // }
          if (sample !== '0') {
           this.beepB.triggerAttack('D5', time, 1);
          }

        }, ['2', '0', '0', '0', '0', '2', '0', '0', '0', '0', '2', '0', '0', '0', '0', '2', '0', '0', '0', '0'], '4n').start(0);

        //Transport.start();

        this.layers[0].index = 0;
        this.layerObservables[0].next(this.layers[0]);
        this.layerObservables[1].next(this.layers[1]);

        // // nice experiment #2, 7 over 4
        // this.loopA = new Sequence((time, sample) => {
        //
        //   console.log('A: time: ' + time + ' sample: ' + sample);
        //   //if (sample !== '0') {
        //     //this.sourceA.get(sample).start(time);
        //   this.player.start(time);
        //   //}
        //
        // }, ['2', '1', '1', '1', '1', '1', '1'], "4n");
        //
        // this.loopB = new Sequence((time, sample) => {
        //
        //   console.log('B: time: ' + time + ' sample: ' + sample);
        //   this.sourceA.get(sample).start(time);
        //
        // }, ['2', '3', '3', '3'], "7n");
        //
        // this.loopA.start(0);
        // this.loopB.start(0);

        // var seq:Sequence= new Sequence((time, note) => {
        //     console.log(note);
        //     this.player.start();
        // //straight quater notes
        // }, ["C4", "E4", "G4", "A4"], "4n");
        //
        // seq.start('1n')
        // Transport.bpm.value = 120;
        // Transport.start();

      //this.playSample(this.sample);

    } else {

      Transport.stop();

      if (this.loopB) {
        this.loopB.stop(0);
      }
      if (this.loopA) {
        this.loopA.stop(0);
      }
    }
  }

  ngOnInit(): void {

    console.log('[AppComponent init]');
    this.left = new Panner(-1).toMaster();
    this.centered = new Panner(0).toMaster();
    this.right = new Panner(1).toMaster();

    this.beepA = new Synth({
      oscillator: {
        type: 'pulse',
        modulationType: 'sine',
        harmonicity: 5
      },
      envelope: {
        attack: 0.01,
        decay: 0.01,
        sustain: 0,
        release: 0.01,
      }
    }).connect(this.left);

    this.beepA.envelope.attackCurve = 'exponential';
    this.beepA.envelope.releaseCurve = 'exponential';

    this.beepB = new Synth({
      oscillator: {
        type: 'pulse',
        modulationType: 'sine',
        harmonicity: 5
      },
      envelope: {
        attack: 0.01,
        decay: 0.01,
        sustain: 0,
        release: 0.01
      }
    }).connect(this.right);

    // let sevenEight:TimeSignature = new TimeSignature(7,8);
    // let fourFour:TimeSignature = new TimeSignature(4,4);
    //
    // this.layers.push(new Layer(sevenEight, [new Bar(1, [1,0,1,0,1,0,1]) ])); //, new Bar(2, [1,0,1,0,1,0,1])]));
    // this.layers.push(new Layer(fourFour, [new Bar(1, [1,0,1,0])])); //,, new Bar(2, [1,0,1,0]), new Bar(2, [1,0,1,0])]));

    const threeFour: TimeSignature = new TimeSignature(3,4);
    const fourFour: TimeSignature = new TimeSignature(4,4);

    this.layers.push(new Layer(1, threeFour, [new Bar(1, [1, 1, 1]) ]));
    this.layers.push(new Layer(2, fourFour, [new Bar(1, [1, 1, 1, 1])]));

    this.layerObservables.push(new BehaviorSubject(this.layers[0]));
    this.layerObservables.push(new BehaviorSubject(this.layers[1]));

    const sampleURLMap = {
      '1': 'assets/exported/klack.[wav|mp3|ogg]',
      '2': 'assets/exported/metronome1.[wav|mp3|ogg]',
      '3': 'assets/exported/tick.[wav|mp3|ogg]',
    };
    // setup a polyphonic sampler
    this.sourceA = new Players(sampleURLMap).connect(this.left);
    this.sourceB = new Players(sampleURLMap).connect(this.right);
    this.updateCommonLayer();
  }

  ngOnChanges(): void {
     this.updateCommonLayer();
  }
}
