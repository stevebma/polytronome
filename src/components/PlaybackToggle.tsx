import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';

type Props = {
    isPlaying: boolean;
    onClick?: () => void;
};

export const PlaybackToggle: React.FC<Props> = ({ isPlaying, onClick }) => {
    return (
        <Button onClick={onClick} title="Toggle playback" variant="primary">
            <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
        </Button>
    );
};
