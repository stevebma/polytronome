import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import type { Layer, TimeSignature } from '../../models';
import { Note } from '../../models';
import type { SequencerClickEvent } from '../../types';
import type { ToggleStatus } from '../../types';
import { MuteToggle } from '../MuteToggle';
import { StepSequencer } from '../StepSequencer';
import { TimeSignatureComponent } from '../TimeSignature';

type LayerControlsProps = {
    isDisabled?: boolean;
    isLayerMuted: Record<number, boolean>;
    layers: Layer[];
    onBeatClick?: (evt: SequencerClickEvent) => void;
    onBeatDoubleClick?: (evt: SequencerClickEvent) => void;
    onExtend: (layerIndex: number) => void;
    onMuteToggle: (layerIndex: number) => void;
    onShrink: (layerIndex: number) => void;
    onTimeSignatureChange: (layerIndex: number, time: TimeSignature) => void;
    showIndices?: boolean;
};

const StyledRow = styled.div`
    background: #f8f9fa;
    border: 1px dashed grey;
`;

const noteToStatusMap: ReadonlyMap<Note, ToggleStatus> = new Map([
    [Note.Accent, 'emphasized'],
    [Note.Play, 'on'],
    [Note.Rest, 'off'],
]);

const layersToSequencerRows = (layers: Layer[]) =>
    layers.map((layer: Layer) => {
        const steps: ToggleStatus[] = layer.bars.flatMap(bar => {
            return bar.beats.map(beat => {
                return noteToStatusMap.get(beat.note) || 'off';
            });
        });
        return {
            groupSize: layer.time.upper,
            steps: steps,
        };
    });

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 0;
    margin: 0;
`;

const LeftControls = styled.div`
    display: grid;
    grid-column: 1 / span 3;
`;

const SequencerContainer = styled.div`
    display: grid;
    grid-column: 4 / span 20;
`;

const RightControls = styled.div`
    display: grid;
    grid-column: 24 / span 1;
`;

export const LayerControls: React.FC<LayerControlsProps> = ({
    isDisabled,
    isLayerMuted,
    layers,
    onBeatClick,
    onBeatDoubleClick,
    onExtend,
    onMuteToggle,
    onShrink,
    onTimeSignatureChange,
    showIndices,
}) => {
    const rows = layersToSequencerRows(layers);
    return (
        <Grid>
            <LeftControls>
                {layers.map((layer: Layer, index: number) => (
                    <StyledRow key={`time-control-${index}`}>
                        <TimeSignatureComponent
                            isDisabled={isDisabled}
                            onChange={timeSignature => onTimeSignatureChange(index, timeSignature)}
                            time={layer.time}
                        />
                    </StyledRow>
                ))}
            </LeftControls>
            <SequencerContainer>
                <StepSequencer
                    onBeatClick={onBeatClick}
                    onBeatDoubleClick={onBeatDoubleClick}
                    rows={rows}
                    sequencerId={'sequencer-1'}
                    showIndices={showIndices}
                />
            </SequencerContainer>
            <RightControls>
                {layers.map((layer: Layer, index: number) => (
                    <StyledRow key={`layer-controls-${index}`}>
                        <Button disabled={isDisabled || layer.size <= 1} onClick={() => onShrink(index)} variant="info">
                            -
                        </Button>
                        <Button disabled={isDisabled || layer.size >= 4} onClick={() => onExtend(index)} variant="info">
                            +
                        </Button>
                        <MuteToggle
                            isDisabled={isDisabled}
                            isMuted={isLayerMuted && isLayerMuted[index]}
                            onClick={() => onMuteToggle(index)}
                        />
                    </StyledRow>
                ))}
            </RightControls>
        </Grid>
    );
};
