import { Chip, FormControl, TextField } from '@mui/material';
import type { ChangeEvent } from 'react';
import React from 'react';
import styled from 'styled-components';

import { TimeSignature } from '../../models';
import { NoteLengthSelect } from '../NoteLengthSelect/NoteLengthSelect';

const Box = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 0;
    margin: 0;
    align-items: center;
`;

const SignatureLabel = styled.div`
    display: grid;
    grid-column: 1 / span 1;
    margin-right: 2px;
    align-items: baseline;
`;

const UpperControl = styled.div`
    display: grid;
    grid-column: 2 / span 2;
`;

const LowerControl = styled.div`
    display: grid;
    grid-column: 4 / span 2;
`;

type TimeSignatureSelectProps = {
    time: TimeSignature;
    disabled?: boolean;
    onChange: (time: TimeSignature) => void;
};

export const TimeSignatureSelect: React.FC<TimeSignatureSelectProps> = ({ disabled = false, onChange, time }) => {
    const handleUpperChange = (event: ChangeEvent<HTMLInputElement>) => {
        const upper = parseInt(event.target.value);
        onChange(new TimeSignature(upper, time.lower));
    };

    const handleLowerChange = (value: number) => {
        onChange(new TimeSignature(time.upper, value));
    };

    return (
        <Box>
            <SignatureLabel>
                <Chip label={`${time.upper} / ${time.lower}`} size="medium" variant="filled" />
            </SignatureLabel>
            <UpperControl>
                <FormControl>
                    <TextField
                        disabled={disabled}
                        inputProps={{ min: 1, max: 17 }}
                        margin="normal"
                        onChange={handleUpperChange}
                        size="small"
                        type="number"
                        value={time.upper}
                        variant="outlined"
                    />
                </FormControl>
            </UpperControl>
            <LowerControl>
                <FormControl>
                    <NoteLengthSelect
                        choices={[2, 4, 8]}
                        disabled={disabled}
                        label=""
                        onChange={handleLowerChange}
                        size="small"
                        value={time.lower}
                    />
                </FormControl>
            </LowerControl>
        </Box>
    );
};
