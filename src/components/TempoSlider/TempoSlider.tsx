import { Chip, Slider, Stack } from '@mui/material';
import React from 'react';

type TempoSliderProps = {
    value: number;
    min?: number;
    max?: number;
    label?: string;
    onChange: (value: number) => void;
};

export const TempoSlider: React.FC<TempoSliderProps> = ({
    value = 100,
    label = 'Tempo',
    max = 200,
    min = 10,
    onChange,
}) => {
    const bpmLabel = `${value.toString().padStart(3, '0')} BPM`;
    return (
        <Stack alignItems="center" direction="row" spacing={3}>
            <Chip label={label} variant="outlined" />
            <Slider
                aria-label="BPM"
                max={max}
                min={min}
                onChange={(evt, value) => onChange(value as number)}
                value={value}
            />
            <Chip label={bpmLabel} />
        </Stack>
    );
};
