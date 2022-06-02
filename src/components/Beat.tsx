import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import type { Beat } from '../models/beat';
import { Note } from '../models/note.enum';

const StyledButton = styled(Button)`
    transition: none;
    width: 3em;
    height: 3em;
`;

type Props = {
    beat: Beat;
    isDisabled: boolean;
    onClick: (index: number) => void;
    onDoubleClick: (index: number) => void;
};

const getButtonVariant = (note: Note): string => {
    switch (note) {
        case Note.Rest: {
            return 'outline-secondary';
        }
        case Note.Play: {
            return 'secondary';
        }
        case Note.Accent: {
            return 'warning';
        }
        default: {
            return 'outline-error';
        }
    }
};

export const BeatComponent: React.FC<Props> = ({ beat, isDisabled, onClick, onDoubleClick }) => {
    return (
        <div className="flex-fill">
            <div aria-label="" className="btn-group" role="group">
                <StyledButton
                    disabled={isDisabled}
                    onClick={() => onClick(beat.index)}
                    onDoubleClick={() => onDoubleClick(beat.index)}
                    size="lg"
                    variant={getButtonVariant(beat.note)}
                >
                    {beat.index + 1}
                </StyledButton>
            </div>
        </div>
    );
};
