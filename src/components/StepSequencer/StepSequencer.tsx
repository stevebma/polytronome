import React from 'react';
import styled from 'styled-components';

import type { SequencerClickEvent, SequencerRowClickEvent, ToggleStatus } from '../../types';
import { StepSequencerRow } from '../StepSequencerRow';

type StepSequencerProps = {
    isDisabled?: boolean;
    onBeatClick?: (evt: SequencerClickEvent) => void;
    onBeatDoubleClick?: (evt: SequencerClickEvent) => void;
    rows: { groupSize: number; steps: ToggleStatus[] }[];
    sequencerId: string;
    showIndices?: boolean;
};

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    row-gap: 2px;
`;

export const StepSequencer: React.FC<StepSequencerProps> = ({
    isDisabled = false,
    onBeatClick,
    onBeatDoubleClick,
    rows,
    sequencerId,
    showIndices = true,
}) => {
    const makeClickEvent = (index: number, evt: SequencerRowClickEvent): SequencerClickEvent => {
        return {
            rowIndex: index,
            ...evt,
        };
    };
    const handleClick = (index: number, evt: SequencerRowClickEvent) => {
        onBeatClick && onBeatClick(makeClickEvent(index, evt));
    };

    const handleDoubleClick = (index: number, evt: SequencerRowClickEvent) => {
        onBeatDoubleClick && onBeatDoubleClick(makeClickEvent(index, evt));
    };

    const magenta = 'rgb(213, 35,165)';
    const orange = 'rgb(210, 158, 64)';
    const green = 'rgb(101, 207, 76)';
    const cyan = 'rgb(37, 202, 205)';
    const purple = 'rgb(146, 99, 224)';
    const colorMap = [magenta, orange, green, cyan, purple];

    return (
        <Container>
            {rows.map((row, index) => {
                const rowId = `sequencer-${sequencerId}-row-${index}`;
                return (
                    <StepSequencerRow
                        color={colorMap[index]}
                        groupSize={row.groupSize}
                        isDisabled={isDisabled}
                        key={rowId}
                        onBeatClick={evt => handleClick(index, evt)}
                        onBeatDoubleClick={evt => handleDoubleClick(index, evt)}
                        rowId={rowId}
                        showIndices={showIndices}
                        steps={row.steps}
                    />
                );
            })}
        </Container>
    );
};
