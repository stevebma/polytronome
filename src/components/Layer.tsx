import React from 'react';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import styled from 'styled-components';

import type { Bar, Layer, TimeSignature } from '../models';
import { BarComponent } from './Bar';
import { MuteToggle } from './MuteToggle';
import { TimeSignatureComponent } from './TimeSignature';

type Props = {
    isDisabled: boolean;
    layer: Layer;
    isMuted: boolean;
    onBeatClick: (layerIndex: number, barIndex: number, beatIndex: number) => void;
    onBeatDoubleClick: (layerIndex: number, barIndex: number, beatIndex: number) => void;
    onExtend: () => void;
    onMuteToggle: () => void;
    onShrink: () => void;
    onTimeSignatureChange: (layerIndex: number, time: TimeSignature) => void;
};

const LayerRow = styled(Row)`
    background: #f8f9fa;
    margin-top: 20px;
    border: 1px dashed grey;
`;

export const LayerComponent: React.FC<Props> = ({
    isDisabled = false,
    isMuted,
    layer,
    onBeatClick,
    onBeatDoubleClick,
    onExtend,
    onMuteToggle,
    onShrink,
    onTimeSignatureChange,
}) => {
    const handleBeatClick = (barIndex: number, beatIndex: number) => {
        onBeatClick(layer.index, barIndex, beatIndex);
    };

    const handleBeatDoubleClick = (barIndex: number, beatIndex: number) => {
        onBeatDoubleClick(layer.index, barIndex, beatIndex);
    };

    const handleTimeSignatureChange = (timeSignature: TimeSignature) => {
        onTimeSignatureChange(layer.index, timeSignature);
    };

    return (
        <LayerRow>
            <TimeSignatureComponent isDisabled={isDisabled} onChange={handleTimeSignatureChange} time={layer.time} />
            {layer.bars.map((bar: Bar) => {
                return (
                    <div className="col" key={`layer-${layer.index}-${bar.index}`}>
                        <BarComponent
                            bar={bar}
                            isDisabled={isDisabled}
                            onBeatClick={handleBeatClick}
                            onBeatDoubleClick={handleBeatDoubleClick}
                        />
                    </div>
                );
            })}
            <Button disabled={isDisabled || layer.size <= 1} onClick={onShrink} variant="info">
                -
            </Button>
            <Button disabled={isDisabled || layer.size >= 4} onClick={onExtend} variant="info">
                +
            </Button>
            <MuteToggle isMuted={isMuted} onClick={onMuteToggle} />
        </LayerRow>
    );
};
