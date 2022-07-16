import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import React from 'react';

type MuteToggleProps = {
    isDisabled?: boolean;
    isMuted: boolean;
    onClick?: () => void;
};

export const MuteToggle: React.FC<MuteToggleProps> = ({ isDisabled, isMuted, onClick }) => {
    const label = isMuted ? 'unmute' : 'mute';
    return (
        <IconButton aria-label={label} color="primary" disabled={isDisabled} onClick={onClick} size="small">
            <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
        </IconButton>
    );
};
