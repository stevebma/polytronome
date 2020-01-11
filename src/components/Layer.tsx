import React, { Component } from 'react';
import { Layer } from '../models/layer';
import { Note } from '../models/note.enum';
import { Bar } from '../models/bar';
import { TimeSignature } from '../models/time-signature';
import { Button } from 'react-bootstrap';
import { TimeSignatureComponent } from './TimeSignature';
import { BarComponent } from './Bar';
import styled from 'styled-components';
import { Row } from 'react-bootstrap';
import { extendLayer, shrinkLayer, changeLayerTimeSignature, setNote, toggleBeat } from '../redux/actions';
import { RootState } from '../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
	rerender: true
});

const mapDispatchToProps = {
	extendLayer: extendLayer,
	shrinkLayer: shrinkLayer,
	changeLayerTimeSignature: changeLayerTimeSignature,
	setNote: setNote,
	toggleBeat: toggleBeat,
};

const connector = connect(
	mapStateToProps,
	mapDispatchToProps,
);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
	layer: Layer;
	isDisabled: boolean;
	onShrink: () => void;
	onExtend: () => void;
	onTimeSignatureChange: (layerIndex: number, time: TimeSignature) => void;
};

const LayerRow = styled(Row)`
	background: #f8f9fa;
	margin-top: 20px;
	border: 1px dashed grey;
`;

class LayerComponent extends Component<Props> {
	static defaultProps = {
		isDisabled: false,
		onShrink: () => {},
		onExtend: () => {},
		onTimeSignatureChange: () => {},
	};

	constructor(props: Props) {
		super(props);
		this.handleShrinkClick = this.handleShrinkClick.bind(this);
		this.handleExtendClick = this.handleExtendClick.bind(this);
		this.handleTimeSignatureChange = this.handleTimeSignatureChange.bind(this);
		this.handleBeatClick = this.handleBeatClick.bind(this);
		this.handleBeatDoubleClick = this.handleBeatDoubleClick.bind(this);
	}

	handleShrinkClick() {
		this.props.shrinkLayer(this.props.layer.index);
	}

	handleExtendClick() {
		this.props.extendLayer(this.props.layer.index);
		this.setState({rerender: true});
	}

	handleTimeSignatureChange(time: TimeSignature) {
		this.props.onTimeSignatureChange(this.props.layer.index, time);
	}

	handleBeatClick(barIndex: number, beatIndex: number) {
		this.props.toggleBeat(this.props.layer.index, barIndex, beatIndex);
		this.setState({rerender: true});
	}

	handleBeatDoubleClick(barIndex: number, beatIndex: number) {
		this.props.setNote(this.props.layer.index, barIndex, beatIndex, Note.Accent);
		// TODO remove
		this.setState({rerender: true});
	}

	render() {
		const { isDisabled, layer } = this.props;
		return (
			<LayerRow>
				<TimeSignatureComponent
					time={layer.time}
					isDisabled={isDisabled}
					onChange={this.handleTimeSignatureChange}
				/>
				{layer.bars.map((bar: Bar) => {
					return (
						<div className="col" key={bar.index}>
							<BarComponent
								bar={bar}
								isDisabled={isDisabled}
								onBeatClick={this.handleBeatClick}
								onBeatDoubleClick={this.handleBeatDoubleClick}
							/>
						</div>
					);
				})}
				<Button variant="info" disabled={isDisabled || layer.size <= 1} onClick={this.handleShrinkClick}>
					-
				</Button>
				<Button variant="info" disabled={isDisabled || layer.size >= 4} onClick={this.handleExtendClick}>
					+
				</Button>
			</LayerRow>
		);
	}
}

export default connector(LayerComponent);
