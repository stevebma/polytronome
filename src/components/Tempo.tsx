import type { ChangeEvent } from 'react';
import React from 'react';
import { Row } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
    bpm: number;
    min?: number;
    max?: number;
    label?: string;
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

export const Tempo: React.FC<Props> = ({ bpm = 100, label = 'Tempo', max = 200, min = 10, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const bpm: number = parseInt(event.target.value || '0');
        onChange(bpm);
    };
    return (
        <Row className="align-items-center">
            <StyledLabel>{label}</StyledLabel>
            <input className="slider" max={max} min={min} onChange={handleChange} type="range" />
            <BPM>{bpm.toString().padStart(3)} BPM</BPM>
        </Row>
    );
};
