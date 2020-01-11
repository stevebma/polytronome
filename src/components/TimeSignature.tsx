import React, { ChangeEvent, Component } from 'react';
import { TimeSignature } from '../models/time-signature';
import { NoteLengthChooser } from './NoteLengthChooser';

type Props = {
	time: TimeSignature;
	isDisabled: boolean;
	onChange: (time: TimeSignature) => void;
};

type State = {};

export class TimeSignatureComponent extends Component<Props, State> {
	static defaultProps = {
		isDisabled: false,
		onChange: () => {},
	};

	constructor(props: Props) {
		super(props);
		this.handleUpperChange = this.handleUpperChange.bind(this);
		this.handleLowerChange = this.handleLowerChange.bind(this);
	}

	handleUpperChange(event: ChangeEvent<HTMLInputElement>) {
		const upper = parseInt(event.target.value);
		const time = new TimeSignature(upper, this.props.time.lower);
		this.props.onChange(time);
	}

	handleLowerChange(value: number) {
		const time = new TimeSignature(this.props.time.upper, value);
		this.props.onChange(time);
	}

	render() {
		const time = this.props.time;
		const isDisabled = this.props.isDisabled;
		return (
			<div className="form-inline">
				<label className="sr-only">Time</label>
				<div className="input-group mb-2 mr-sm-2">
					<div className="input-group-prepend">
						<div className="input-group-text">
							{time.upper}/{time.lower}
						</div>
					</div>
					<input
						type="number"
						className="form-control"
						min="1"
						max="17"
						disabled={isDisabled}
						value={time.upper}
						onChange={this.handleUpperChange}
					/>
				</div>
				<NoteLengthChooser
					duration={time.lower}
					choices={[2, 4, 8]}
					isDisabled={isDisabled}
					onSelect={this.handleLowerChange}
				/>
			</div>
		);
	}
}
