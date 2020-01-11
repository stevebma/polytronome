import React, { ChangeEvent, Component, RefObject } from 'react';
import './math';
import Vex from 'vexflow';
import { PlaybackToggle } from './components/PlaybackToggle';
import LayerComponent from './components/Layer';
import { Tempo } from './components/Tempo';
import { TimeSignature } from './models/time-signature';
import { Layer } from './models/layer';
import { Bar } from './models/bar';
import {
	Player,
	Players,
	Volume,
	Sequence,
	Synth,
	SynthOptions,
	Transport,
	Part,
	Panner,
	Encoding,
	TimeEventObject,
	PlayersOptions,
} from 'tone';
import 'vexflow';
import { LayerNotationComponent } from './components/LayerNotation';
import { Row, Button, Container } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './redux/reducers';
import { togglePlayback, changeTempo, addLayer, changeLayerTimeSignature } from './redux/actions';

const mapStateToProps = (state: RootState) => ({
	isPlaying: state.playback.isPlaying,
	bpm: state.playback.bpm,
	layers: state.layers.layers,
});

const mapDispatchToProps = {
	togglePlayback: togglePlayback,
	changeTempo: changeTempo,
	addLayer: addLayer,
	changeLayerTimeSignature: changeLayerTimeSignature,
};

const connector = connect(
	mapStateToProps,
	mapDispatchToProps,
);

// The inferred type will look like:
// {isPlaying: boolean, bpm: number, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

type State = {};

class App extends Component<Props, State> {
	title = 'Polytronome';
	combinedNotation!: RefObject<HTMLDivElement>;
	commonLayer?: Layer;
	combinedNotes: Vex.Flow.StaveNote[];

	// private player: Player;
	// private sourceA: Players;
	// private sourceB: Players;
	private left: Panner;
	private right: Panner;
	private centered: Panner;
	// private part: Part;
	private bpmFactor: number = 1;

	private loopA: Sequence<string>;
	private loopB: Sequence<string>;

	private beepA: Synth;
	private beepB: Synth;

	constructor(props: Props) {
		super(props);
		this.combinedNotation = React.createRef<HTMLDivElement>();
		this.handleBPMChange = this.handleBPMChange.bind(this);
		this.togglePlaybackState = this.togglePlaybackState.bind(this);
		this.handleTimeSignatureChange = this.handleTimeSignatureChange.bind(this);
		this.combinedNotes = [];
		this.left = new Panner(-1).toMaster();
		this.centered = new Panner(0).toMaster();
		this.right = new Panner(1).toMaster();

		this.loopA = new Sequence(() => {}, [], '4n');
		this.loopB = new Sequence(() => {}, [], '4n');

		this.beepA = new Synth({
			oscillator: {
				type: 'pulse',
				modulationType: 'sine',
				harmonicity: 5,
			},
			envelope: {
				attack: 0.01,
				decay: 0.01,
				sustain: 0,
				release: 0.01,
			},
		}).connect(this.left);

		this.beepA.envelope.attackCurve = 'exponential';
		this.beepA.envelope.releaseCurve = 'exponential';

		this.beepB = new Synth({
			oscillator: {
				type: 'pulse',
				modulationType: 'sine',
				harmonicity: 5,
			},
			envelope: {
				attack: 0.01,
				decay: 0.01,
				sustain: 0,
				release: 0.01,
			},
		}).connect(this.right);

		// const sampleURLMap = {
		// 	'1': 'assets/exported/klack.[wav|mp3|ogg]',
		// 	'2': 'assets/exported/metronome1.[wav|mp3|ogg]',
		// 	'3': 'assets/exported/tick.[wav|mp3|ogg]',
		// };
		// // setup a polyphonic sampler
		// this.sourceA = new Players(sampleURLMap).connect(this.left);
		// this.sourceB = new Players(sampleURLMap).connect(this.right);
	}

	initLayers() {
		// let sevenEight:TimeSignature = new TimeSignature(7,8);
		// let fourFour:TimeSignature = new TimeSignature(4,4);
		// this.layers.push(new Layer(sevenEight, [new Bar(1, [1,0,1,0,1,0,1]) ])); //, new Bar(2, [1,0,1,0,1,0,1])]));
		// this.layers.push(new Layer(fourFour, [new Bar(1, [1,0,1,0])])); //,, new Bar(2, [1,0,1,0]), new Bar(2, [1,0,1,0])]));

		const threeFour: TimeSignature = new TimeSignature(3, 4);
		const fourFour: TimeSignature = new TimeSignature(4, 4);

		this.props.addLayer(new Layer(0, threeFour, [new Bar(0, [1, 1, 1])]));
		this.props.addLayer(new Layer(1, fourFour, [new Bar(0, [1, 1, 1, 1])]));
	}

	updateCommonLayer() {
		if (!this.combinedNotation.current) {
			return;
		}

		if (!this.props.layers || this.props.layers.length <= 1) {
			return;
		}
		this.combinedNotation.current.innerHTML = '';
		const width = 1024; //this.combinedNotation.current.clientWidth;
		const height = 200;
		let renderer = new Vex.Flow.Renderer(this.combinedNotation.current, Vex.Flow.Renderer.Backends.SVG);
		renderer.resize(width, height);

		// And get a drawing context:
		let context = renderer.getContext();
		context.clear();

		let upper = Math.lcm(this.props.layers[0].time.upper, this.props.layers[1].time.upper);
		let lower = Math.lcm(this.props.layers[0].time.lower, this.props.layers[1].time.lower);

		let commonTime = new TimeSignature(upper, lower);

		// Create a stave at position 10, 40 of width 400 on the canvas.
		let stave = new Vex.Flow.Stave(0, 0, width);

		// Add a clef and time signature.
		stave.addClef('percussion');
		stave.addTimeSignature(commonTime.toString());
		stave.setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);
		stave.setEndBarType(Vex.Flow.Barline.type.REPEAT_END);
		// Connect it to the rendering context and draw!
		stave.setContext(context).draw();

		let voices = [];
		let keys = ['e/4', 'g/5', 'b/4'];

		// this.layers.forEach( (layer: Layer, index: number) => {

		let layer: Layer = this.props.layers[0];
		let scaling: number = upper / layer.time.upper;
		console.log('scaling ' + scaling);
		let notes = layer.getStaveNotes(scaling, keys[0]);
		Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);

		layer = this.props.layers[1];
		scaling = upper / layer.time.upper;
		console.log('scaling ' + scaling);
		notes = layer.getStaveNotes(scaling, keys[1]);
		console.log(notes);
		Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);

		// const scale: number = upper % layer.time.upper;
		// const notes = layer.getStaveNotes(scale, '4');
		// layer.bars.forEach( (bar: Bar, index: number) => {}
		// });
	}

	updateTempo() {
		Transport.bpm.value = this.props.bpm * this.bpmFactor;
	}

	togglePlaybackState() {
		this.props.togglePlayback();
	}

	toggleAudio() {
		if (this.props.isPlaying) {
			this.start();
		} else {
			this.stop();
		}
	}

	start() {
		if (Transport.state === 'started') {
			return;
		}
		// check if context is in suspended state (autoplay policy)
		// if (this.audioCtx.state === 'suspended') {
		// 			// 	this.audioCtx.resume();
		// 			// }
		// this.player.start();
		console.log('starting playback!');
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

		// // nice experiment, 3 over 4
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
		/*****************************************************/
		this.bpmFactor = 5;
		this.updateTempo();
		Transport.timeSignature = 20; // [20, 4];
		const Velocity: number = 0.05;

		this.loopA = new Sequence(
			(time, sample) => {
				//console.log('A: time: ' + time + ' sample: ' + sample);
				if (sample !== '0') {
					this.beepA.triggerAttack('G5', time, Velocity);
					//this.sourceA.get(sample).start(time);
				}
			},
			['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0'],
			'4n',
		).start(0);

		this.loopB = new Sequence(
			(time, sample) => {
				//console.log('B: time: ' + time + ' sample: ' + sample);
				// if (sample !== '0') {
				//   this.sourceB.get(sample).start(time);
				// }
				if (sample !== '0') {
					this.beepB.triggerAttack('D5', time, Velocity);
				}
			},
			['2', '0', '0', '0', '0', '2', '0', '0', '0', '0', '2', '0', '0', '0', '0', '2', '0', '0', '0', '0'],
			'4n',
		).start(0);

		/*****************************************************/
		const volume = new Volume(0.1).toMaster();
		Transport.start();

		// this.props.layers[0].index = 0;
		// this.layerObservables[0].next(this.layers[0]);
		// this.layerObservables[1].next(this.layers[1]);

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
	}

	stop() {
		if (Transport.state !== 'stopped') {
			Transport.stop();
			if (this.loopB) {
				this.loopB.stop(0);
			}
			if (this.loopA) {
				this.loopA.stop(0);
			}
		}
	}

	render() {
		const { layers, bpm, isPlaying } = this.props;
		return (
			<Container>
				{layers.map((layer: Layer) => {
					return <LayerNotationComponent layer={layer} key={layer.index} />;
				})}
				<Row>
					<div ref={this.combinedNotation} />
				</Row>
				<Row>
					<Tempo bpm={bpm} onChange={this.handleBPMChange} />
					<PlaybackToggle isPlaying={isPlaying} onClick={this.togglePlaybackState} />
				</Row>
				{layers.map((layer: Layer) => {
					return (
						<LayerComponent
							layer={layer}
							isDisabled={isPlaying}
							onTimeSignatureChange={this.handleTimeSignatureChange}
							key={layer.index + 100}
						/>
					);
				})}
			</Container>
		);
	}

	handleBPMChange(bpm: number) {
		this.props.changeTempo(bpm);
	}

	handleTimeSignatureChange(layerIndex: number, time: TimeSignature) {
		this.props.changeLayerTimeSignature(layerIndex, time);
	}

	componentDidMount() {
		this.initLayers();
		this.updateCommonLayer();
	}

	componentDidUpdate() {
		this.updateCommonLayer();
		this.updateTempo();
		this.toggleAudio();
	}
}

export default connector(App);
