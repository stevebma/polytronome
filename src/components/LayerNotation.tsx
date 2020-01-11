import React, { Component, RefObject } from 'react';
import Vex from 'vexflow';
import styled from 'styled-components';
import { Layer } from '../models/layer';
import { Bar } from '../models/bar';
import { Row } from 'react-bootstrap';

type Props = {
	layer: Layer;
	width: number,
	height: number
};

const NotationRow = styled(Row)`
	background: #f8f9fa;
	padding: 1em;
	border: 1px solid grey;
`;

const Notation = styled.div`
	width: 100%;
	background: white;
	
	// hack to align marcato articulation with stem -- instead of note
	g.vf-modifiers {
		transform: translateX(4px);
		color: green;
	}
`;

export class LayerNotationComponent extends Component<Props> {

	static defaultProps = {
		layer: Layer.create44(),
		width: 1024,
		height: 100
	};

	private readonly notationDiv: RefObject<HTMLDivElement>;
	private renderer: Vex.Flow.Renderer | null;

	constructor(props: Props) {
		super(props);
		this.notationDiv = React.createRef<HTMLDivElement>();
		this.renderer = null;
	}

	componentDidMount() {
		this.initRenderer();
		this.renderNotation();
	}

	componentDidUpdate() {
		this.renderNotation();
	}

	initRenderer() {
		if (!this.notationDiv.current) {
			throw Error('Failed to initialize LayerNotation component');
		}
		// render musical notation using vexflow
		// create an SVG renderer and attach it to the referenced div element
		this.renderer = new Vex.Flow.Renderer(this.notationDiv.current, Vex.Flow.Renderer.Backends.SVG);
	}

	renderNotation() {
		if (!this.renderer) {
			throw Error('Failed to initialize LayerNotation renderer');
		}
		if (!this.notationDiv.current) {
			throw Error('Failed to initialize LayerNotation component');
		}

		const { layer, width, height } = this.props;

		const autoWidth = this.notationDiv.current.clientWidth;

		// Size our SVG:
		this.renderer.resize(autoWidth, height);

		// And get a drawing context:
		let context = this.renderer.getContext();
		context.clear();

		// Create a stave at position 0, 0 of width 1024 on the canvas.
		let stave = new Vex.Flow.Stave(0, 0, autoWidth);

		// add a percussion clef + time signature.
		stave.addClef('percussion');
		stave.addTimeSignature(layer.time.toString());

		// add repeat signs
		stave.setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);
		stave.setEndBarType(Vex.Flow.Barline.type.REPEAT_END);

		// connect it to the rendering context and draw the stave
		stave.setContext(context).draw();

		// add all notes
		let notes: Vex.Flow.Note[] = [];

		layer.bars.forEach((bar: Bar, index: number) => {
			const duration: string = layer.time.lower.toString();
			let barNotes = bar.getStaveNotes(1, duration, 'b/4');
			notes = notes.concat(barNotes);

			// render a barline for all except the final bar
			if (index < layer.bars.length - 1) {
				notes.push(new Vex.Flow.BarNote());
			}
		});

		// Create a voice in the layers time signature and add above notes
		Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);

		// Format and justify the notes to given width in pixels.
		// const formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 1024, {align_rests: false, context: context});

		// Render voice
		// voice.draw(context, stave);
	}

	render() {
		const { layer } = this.props;
		return (
			<NotationRow>
				<p>
					layer: {layer.index} | time signature: {layer.time.toString()} |{' '}
					{`${layer.size} ${layer.size === 1 ? 'bar' : 'bars'}`}
				</p>
				<Notation ref={this.notationDiv} />
			</NotationRow>
		);
	}
}
