import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';

type Props = {
    isMuted: boolean;
    onClick?: () => void;
};

export const MuteToggle: React.FC<Props> = ({ isMuted, onClick }) => {
    return (
        <Button onClick={onClick} title="mute" variant="primary">
            <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
        </Button>
    );
};
