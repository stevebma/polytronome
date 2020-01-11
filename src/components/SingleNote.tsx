import React, { Component, MouseEventHandler, RefObject } from 'react';
import styled from 'styled-components';
import * as Vex from 'vexflow';

type Props = {
	duration: number;
	label: string;
	onClick?: MouseEventHandler;
	width: number; // in pixels
	height: number; // in pixels
};

const NoteWrapper = styled.div`
	zoom: 0.6;
	display: inline;
`;

const NoteLabel = styled.span`
	color: black;
	font-weight: bold;
`;

export class SingleNote extends Component<Props> {
	static defaultProps = {
		duration: 4,
		label: '4',
		onClick: () => {},
		width: 50,
		height: 75,
	};

	private renderer: Vex.Flow.Renderer | null;
	private readonly containerRef: RefObject<HTMLDivElement>;

	constructor(props: Props) {
		super(props);
		this.containerRef = React.createRef<HTMLDivElement>();
		this.renderer = null;
	}

	componentDidMount() {
		this.initRenderer();
		this.draw();
	}

	componentDidUpdate(): void {
		this.draw();
	}

	initRenderer() {
		if (!this.containerRef || !this.containerRef.current) {
			return;
		}
		if (!this.renderer) {
			this.renderer = new Vex.Flow.Renderer(this.containerRef.current, Vex.Flow.Renderer.Backends.SVG);
		}
	}

	draw() {
		if (this.renderer) {
			const { width, height, duration } = this.props;
			this.renderer.resize(width, height);
			const context = this.renderer.getContext();
			context.clear();
			const stave = new Vex.Flow.Stave(0, -10, width);
			const note = new Vex.Flow.StaveNote({
				keys: ['b/4'],
				duration: duration.toString(),
				stem_direction: 1,
			});
			const voice = new Vex.Flow.Voice({ num_beats: 1, beat_value: duration });
			voice.addTickables([note]);
			const formatter = new Vex.Flow.Formatter();
			formatter.joinVoices([voice]).format([voice], width);
			voice.draw(context, stave);
		}
	}

	render() {
		const { label, onClick } = this.props;
		return (
			<NoteWrapper ref={this.containerRef} onClick={onClick}>
				<NoteLabel>{label}</NoteLabel>
			</NoteWrapper>
		);
	}
}
