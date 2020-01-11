import React, { Component } from 'react';
import { Beat } from '../models/beat';
import { Note } from '../models/note.enum';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledButton = styled(Button)`
	transition: none;
	width: 3em;
	height: 3em;
`;

type Props = {
	beat: Beat;
	isDisabled: boolean,
	onClick: (index: number) => void,
	onDoubleClick: (index: number) => void
};

export class BeatComponent extends Component<Props> {

	constructor(props: Props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
	}

	handleClick() {
		this.props.onClick(this.props.beat.index);
	}

	handleDoubleClick() {
		this.props.onDoubleClick(this.props.beat.index);
	}

	getButtonVariant() {
		switch (this.props.beat.note) {
			case Note.Rest: {
				return `outline-secondary`;
			}
			case Note.Play: {
				return `secondary`;
			}
			case Note.Accent: {
				return `warning`;
			}
			default: {
				return `outline-error`;
			}
		}
	}

	render() {
		const { beat, isDisabled } = this.props;
		return (
			<div className="flex-fill">
				<div className="btn-group" role="group" aria-label="">
					<StyledButton
						size="lg"
						variant={this.getButtonVariant()}
						disabled={isDisabled}
						onClick={this.handleClick}
						onDoubleClick={this.handleDoubleClick}
					>
						{beat.index + 1}
					</StyledButton>
				</div>
			</div>
		);
	}
}
