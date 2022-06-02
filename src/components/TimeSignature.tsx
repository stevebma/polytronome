import type { ChangeEvent } from 'react';
import React from 'react';

import { TimeSignature } from '../models';
import { NoteLengthChooser } from './NoteLengthChooser';

type Props = {
    time: TimeSignature;
    isDisabled?: boolean;
    onChange: (time: TimeSignature) => void;
};

export const TimeSignatureComponent: React.FC<Props> = ({ isDisabled = false, onChange, time }) => {
    const handleUpperChange = (event: ChangeEvent<HTMLInputElement>) => {
        const upper = parseInt(event.target.value);
        onChange(new TimeSignature(upper, time.lower));
    };

    const handleLowerChange = (value: number) => {
        onChange(new TimeSignature(time.upper, value));
    };

    return (
        <div className="form-inline">
            <label className="sr-only">Time</label>
            <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        {time.upper}/{time.lower}
                    </div>
                </div>
                <input
                    className="form-control"
                    disabled={isDisabled}
                    max="17"
                    min="1"
                    onChange={handleUpperChange}
                    type="number"
                    value={time.upper}
                />
            </div>
            <NoteLengthChooser
                choices={[2, 4, 8]}
                duration={time.lower}
                isDisabled={isDisabled}
                onSelect={handleLowerChange}
            />
        </div>
    );
};
