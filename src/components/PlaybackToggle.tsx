import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import React from 'react';

type PlaybackToggleProps = {
    isPlaying: boolean;
    onClick: () => void;
};

export const PlaybackToggle: React.FC<PlaybackToggleProps> = ({ isPlaying, onClick }) => {
    return (
        <Button
            aria-label="Toggle playback"
            color={isPlaying ? 'secondary' : 'primary'}
            onClick={onClick}
            size="small"
            variant={isPlaying ? 'contained' : 'contained'}
        >
            <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
        </Button>
    );
};
