import 'react';
import React, { Component } from 'react';
import { Bar } from '../models/bar';
import { Beat } from '../models/beat';
import { BeatComponent } from './Beat';
import styled from 'styled-components';

type Props = {
	bar: Bar;
	isDisabled: boolean,
	onBeatClick: (barIndex: number, beatIndex: number) => void;
	onBeatDoubleClick: (barIndex: number, beatIndex: number) => void;
};

const BarWrapper = styled.div`
	background: lightgrey;
`;

export class BarComponent extends Component<Props> {

	constructor(props: Props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
	}

	handleClick(beatIndex: number) {
		this.props.onBeatClick(this.props.bar.index, beatIndex);
	}

	handleDoubleClick(beatIndex: number) {
		this.props.onBeatDoubleClick(this.props.bar.index, beatIndex);
	}

	render() {
		const { bar, isDisabled } = this.props;
		return (
			<BarWrapper className="d-flex justify-content">
				{bar.beats.map((beat: Beat) => {
					return (
						<div className="flex-fill" key={beat.index}>
							<BeatComponent
								beat={beat}
								isDisabled={isDisabled}
								onClick={this.handleClick}
								onDoubleClick={this.handleDoubleClick}
							/>
						</div>
					);
				})}
			</BarWrapper>
		);
	}
}
