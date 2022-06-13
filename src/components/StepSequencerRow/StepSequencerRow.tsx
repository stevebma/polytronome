import React, { Fragment } from 'react';
import styled from 'styled-components';

import type { ToggleStatus, SequencerRowClickEvent } from '../../types';
import { StepToggle } from '../StepToggle';

type BeatSequencerRowProps = {
    rowId: string;
    color: string;
    groupSize: number;
    isDisabled?: boolean;
    onBeatClick?: (evt: SequencerRowClickEvent) => void;
    onBeatDoubleClick?: (evt: SequencerRowClickEvent) => void;
    showIndices?: boolean;
    steps: ToggleStatus[];
};

const StyledRow = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    width: 100%;
    height: 100%;
    column-gap: 2px;
`;

const GroupDivider = styled.div`
    width: 40px;
    height: 100%;
`;

export const StepSequencerRow: React.FC<BeatSequencerRowProps> = ({
    color,
    groupSize,
    isDisabled = false,
    onBeatClick,
    onBeatDoubleClick,
    rowId,
    showIndices,
    steps,
}) => {
    const makeBeatClickEvent = (index: number): SequencerRowClickEvent => {
        return {
            index: index,
            groupIndex: Math.floor(index / groupSize),
            subIndex: index % groupSize,
        };
    };
    const handleClick = (index: number) => {
        onBeatClick && onBeatClick(makeBeatClickEvent(index));
    };

    const handleDoubleClick = (index: number) => {
        onBeatDoubleClick && onBeatDoubleClick(makeBeatClickEvent(index));
    };

    return (
        <StyledRow>
            {steps.map((step, index) => {
                const label = showIndices ? `${(index % groupSize) + 1}` : 'undefined';
                return (
                    <Fragment key={`${rowId}-toggle-${index}`}>
                        {index % groupSize === 0 && index > 0 && <GroupDivider key={`${rowId}-divider-${index}`} />}
                        <StepToggle
                            color={color}
                            isDisabled={isDisabled}
                            label={label}
                            onClick={() => handleClick(index)}
                            onDoubleClick={() => handleDoubleClick(index)}
                            status={step}
                        />
                    </Fragment>
                );
            })}
        </StyledRow>
    );
};
