import React from 'react';
import styled from 'styled-components';

import { MuteToggle } from '../MuteToggle';
import { PlaybackToggle } from '../PlaybackToggle';
import { TempoSlider } from '../TempoSlider';

type MainControlsProps = {
    bpm: number;
    isMuted: boolean;
    isPlaying: boolean;
    onMuteToggle: () => void;
    onPlaybackToggle: () => void;
    onTempoChange: (value: number) => void;
};

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 0;
    margin: 0;
    width: 100%;
    max-width: 800px;
`;

const TempoControls = styled.div`
    display: grid;
    grid-column: 1 / span 8;
`;

const PlayButtonWrapper = styled.div`
    display: grid;
    grid-column: 9 / span 1;
    padding: 0 10px;
`;

const MuteButtonWrapper = styled.div`
    display: grid;
    grid-column: 10 / span 1;
`;

export const MainControls: React.FC<MainControlsProps> = ({
    bpm,
    isMuted,
    isPlaying,
    onMuteToggle,
    onPlaybackToggle,
    onTempoChange,
}) => {
    return (
        <Container>
            <TempoControls>
                <TempoSlider onChange={onTempoChange} value={bpm} />
            </TempoControls>
            <PlayButtonWrapper>
                <PlaybackToggle isPlaying={isPlaying} onClick={onPlaybackToggle} />
            </PlayButtonWrapper>
            <MuteButtonWrapper>
                <MuteToggle isMuted={isMuted} onClick={onMuteToggle} />
            </MuteButtonWrapper>
        </Container>
    );
};
