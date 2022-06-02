import 'react';

import React from 'react';
import styled from 'styled-components';

import type { Bar, Beat } from '../models';
import { BeatComponent } from './Beat';

type Props = {
    bar: Bar;
    isDisabled: boolean;
    onBeatClick: (barIndex: number, beatIndex: number) => void;
    onBeatDoubleClick: (barIndex: number, beatIndex: number) => void;
};

const BarWrapper = styled.div`
    background: lightgrey;
`;

export const BarComponent: React.FC<Props> = ({ bar, isDisabled, onBeatClick, onBeatDoubleClick }) => {
    const handleClick = (beatIndex: number) => {
        onBeatClick(bar.index, beatIndex);
    };

    const handleDoubleClick = (beatIndex: number) => {
        onBeatDoubleClick(bar.index, beatIndex);
    };
    return (
        <BarWrapper className="d-flex justify-content">
            {bar.beats.map((beat: Beat) => {
                return (
                    <div className="flex-fill" key={`bar-${bar.index}-${beat.index}`}>
                        <BeatComponent
                            beat={beat}
                            isDisabled={isDisabled}
                            onClick={handleClick}
                            onDoubleClick={handleDoubleClick}
                        />
                    </div>
                );
            })}
        </BarWrapper>
    );
};
