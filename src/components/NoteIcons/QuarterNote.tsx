import React from 'react';

import type { IconProps } from './index';

export const QuarterNote = ({ color = '#000' }: IconProps): JSX.Element => {
    return (
        <svg preserveAspectRatio="none" viewBox="0 0 25 50" xmlns="http://www.w3.org/2000/svg">
            <g className="vf-stavenote" transform="matrix(1, 0, 0, 1, -17, -17)">
                <g className="vf-note">
                    <path className="vf-stem" d="M28.184 53V20" fill="none" stroke={color} strokeWidth="1.5" />
                    <path
                        className="vf-notehead"
                        d="M20.931 60.054c3.594 0 8.003-3.313 8.003-6.739 0-2.078-1.629-3.37-3.931-3.37-4.437 0-8.003 3.286-8.003 6.74 0 2.106 1.741 3.37 3.931 3.37"
                        fill={color}
                    />
                </g>
            </g>
        </svg>
    );
};
