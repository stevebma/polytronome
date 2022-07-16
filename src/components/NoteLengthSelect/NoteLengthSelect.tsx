import 'vexflow';

import type { SelectChangeEvent } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import type { Duration } from '../../types';
import { NoteIcon } from '../NoteIcons';

const noteIconColor = '#222';

const NoteIconWrapper = styled.div`
    margin: 0;
    padding: 0;
    width: 15px;
    height: 30px;
`;

type NoteLengthSelectProps = {
    id?: string;
    choices?: Duration[];
    disabled?: boolean;
    label?: string;
    onChange: (value: number) => void;
    size?: 'small' | 'medium';
    value: number;
};

export const NoteLengthSelect: React.FC<NoteLengthSelectProps> = ({
    id = 'note-length-select',
    choices = [2, 4, 8, 16],
    disabled = false,
    label = 'Length',
    onChange,
    size,
    value,
}) => {
    const labelId = `${id}-label`;
    const handleChange = (evt: SelectChangeEvent<number>) => {
        evt.preventDefault();
        const value: number | string = evt.target.value;
        const parsedValue = typeof value === 'string' ? Number.parseInt(value) : value;
        onChange(parsedValue);
    };
    return (
        <FormControl disabled={disabled} margin="normal" size={size}>
            {label && <InputLabel id={labelId}>{label}</InputLabel>}
            <Select
                autoWidth
                id={id}
                labelId={label ? labelId : undefined}
                margin="dense"
                onChange={handleChange}
                size={size}
                value={value}
                variant="outlined"
            >
                {choices.map(duration => (
                    <MenuItem dense={true} key={`${id}-menuitem-${duration}`} value={duration}>
                        <NoteIconWrapper>
                            <NoteIcon color={noteIconColor} duration={duration} key={`${id}-icon-${value}`} />
                        </NoteIconWrapper>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
