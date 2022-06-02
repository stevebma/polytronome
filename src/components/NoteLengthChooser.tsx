import 'vexflow';

import React from 'react';
import { Dropdown } from 'react-bootstrap';

import { SingleNote } from './SingleNote';

type Props = {
    choices: number[];
    duration: number;
    isDisabled?: boolean;
    onSelect: (value: number) => void;
};

export const NoteLengthChooser: React.FC<Props> = ({ choices, duration, isDisabled = false, onSelect }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle disabled={isDisabled} id="note-length-dropdown" size="sm" variant="success">
                <SingleNote duration={duration} label={duration.toString()} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {choices.map((value: number) => {
                    return (
                        <Dropdown.Item
                            key={value}
                            onSelect={() => {
                                onSelect(value);
                            }}
                        >
                            <SingleNote duration={value} label={value.toString()} />
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};
