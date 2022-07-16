import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import type { Layer, TimeSignature } from '../../models';
import { Note } from '../../models';
import type { SequencerClickEvent } from '../../types';
import type { ToggleStatus } from '../../types';
import { MuteToggle } from '../MuteToggle';
import { StepSequencer } from '../StepSequencer';
import { TimeSignatureSelect } from '../TimeSignatureSelect';

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
    grid-column: 1 / span 4;
`;

const SequencerContainer = styled.div`
    display: grid;
    grid-column: 5 / span 19;
    padding: 0 5px;
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
                        <TimeSignatureSelect
                            disabled={isDisabled}
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
                        <IconButton
                            aria-label="Shrink"
                            color="primary"
                            disabled={isDisabled || layer.size <= 1}
                            onClick={() => onShrink(index)}
                            size="medium"
                        >
                            <FontAwesomeIcon icon={faSquareMinus} />
                        </IconButton>
                        <IconButton
                            aria-label="Extend"
                            color="primary"
                            disabled={isDisabled || layer.size >= 4}
                            onClick={() => onExtend(index)}
                            size="medium"
                        >
                            <FontAwesomeIcon icon={faSquarePlus} />
                        </IconButton>
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
