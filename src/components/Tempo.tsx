import React, {ChangeEvent, Component, MouseEventHandler, RefObject} from 'react';
import styled from 'styled-components';
import {Col, Row} from "react-bootstrap";

type Props = {
	bpm: number;
	min: number;
	max: number;
	label: string;
	onChange: (value: number) => void;
};

const StyledLabel = styled.div`
    font-family: 'courier';
`;

const BPM = styled.span`
	color: black;
	font-weight: bold;
	text-align: center;
	font-family: 'courier';
	width: 6em;
	padding: 0.5em;
	border: 1px solid grey;
	margin: 0 1em 0 1em;
`;

export class Tempo extends Component<Props, {}> {
	static defaultProps = {
		bpm: 100,
        min: 10,
        max: 200,
		label: 'Tempo'
	};

	constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

	handleChange(event: ChangeEvent<HTMLInputElement>) {
		const bpm: number = parseInt(event.target.value || '0');
		this.props.onChange(bpm);
	}

	render() {
		return (
		    <Row className="align-items-center">
                <StyledLabel>{this.props.label}</StyledLabel>
                <input type="range" min={this.props.min} max={this.props.max} className="slider" onChange={this.handleChange} />
                <BPM>{this.props.bpm.toString().padStart(3)} BPM</BPM>
            </Row>
		);
	}
}
