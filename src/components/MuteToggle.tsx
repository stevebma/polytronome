import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';

type Props = {
    isDisabled?: boolean;
    isMuted: boolean;
    onClick?: () => void;
};

export const MuteToggle: React.FC<Props> = ({ isDisabled, isMuted, onClick }) => {
    return (
        <Button disabled={isDisabled} onClick={onClick} title="mute" variant="primary">
            <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
        </Button>
    );
};
