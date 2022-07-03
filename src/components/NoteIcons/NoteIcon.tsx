import React from 'react';

import type { Duration } from '../../types';
import { EighthNote } from './EighthNote';
import { HalfNote } from './HalfNote';
import type { IconProps } from './index';
import { QuarterNote } from './QuarterNote';
import { SixteenthNote } from './SixteenthNote';
import { WholeNote } from './WholeNote';

export type NoteIconProps = IconProps & {
    duration: Duration;
};

export const NoteIcon = ({ duration, color }: NoteIconProps): JSX.Element => {
    switch (duration) {
        case 1:
            {
                return <WholeNote color={color} />;
            }
            break;
        case 2:
            {
                return <HalfNote color={color} />;
            }
            break;
        case 4:
            {
                return <QuarterNote color={color} />;
            }
            break;
        case 8:
            {
                return <EighthNote color={color} />;
            }
            break;
        case 16:
            {
                return <SixteenthNote color={color} />;
            }
            break;
        default:
            throw new Error(`unsupported duration ${duration}`);
    }
};
