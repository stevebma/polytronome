import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'vexflow';
import { SingleNote } from './SingleNote';

type Props = {
	choices: number[];
	onSelect: (value: number) => void;
	isDisabled: boolean;
	duration: number;
};

type State = {};

export class NoteLengthChooser extends Component<Props, State> {
	static defaultProps = {
		isDisabled: false,
		onSelect: () => {},
	};

	constructor(props: Props, state: State) {
		super(props, state);
	}

	render() {
		const { isDisabled, duration, choices } = this.props;
		return (
			<Dropdown>
				<Dropdown.Toggle size="sm" variant="success" id="note-length-dropdown" disabled={isDisabled}>
					<SingleNote duration={duration} label={duration.toString()} />
				</Dropdown.Toggle>
				<Dropdown.Menu>
					{choices.map((value: number) => {
						return (
							<Dropdown.Item key={value} onSelect={() => { this.handleSelect(value) }}>
								<SingleNote duration={value} label={value.toString()} />
							</Dropdown.Item>
						);
					})}
				</Dropdown.Menu>
			</Dropdown>
		);
	}

	handleSelect(value: number) {
		this.props.onSelect(value);
	}
}
