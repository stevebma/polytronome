import React from 'react';

import type { IconProps } from './index';

export const HalfNote = ({ color = '#000' }: IconProps): JSX.Element => {
    return (
        <svg preserveAspectRatio="none" viewBox="0 0 25 50" xmlns="http://www.w3.org/2000/svg">
            <g className="vf-stavenote" transform="matrix(1, 0, 0, 1, -17, -17)">
                <g className="vf-note">
                    <g className="vf-stem">
                        <path
                            d="M28.184 52.45L28.184 20"
                            fill="none"
                            stroke={color}
                            strokeDasharray="none"
                            strokeWidth="1.5"
                        />
                    </g>
                    <g className="vf-notehead">
                        <path
                            d="M20.9312 60.0544C27.58616 60.0544,28.934 54.63496,28.934 53.3152C28.934 51.23728,27.27728 49.9456,24.91856 49.9456C18.90944 49.9456,17 54.60688,17 56.6848C17 58.84696,18.6848 60.0544,20.9312 60.0544M20.03264 58.51C19.19024 58.51,18.6848 58.06072,18.404 57.58336C18.29168 57.35872,18.17936 57.04984,18.17936 56.76904C18.17936 54.80344,24.04808 51.60232,25.92944 51.60232C26.71568 51.60232,27.136879999999998 51.96736,27.44576 52.44472C27.55808 52.69744,27.6704 52.95016,27.6704 53.23096C27.6704 54.97192,21.97016 58.51,20.03264 58.51"
                            fill={color}
                            stroke="none"
                            strokeDasharray="none"
                            strokeWidth="0.3"
                        />
                    </g>
                </g>
                <g className="vf-modifiers"></g>
            </g>
        </svg>
    );
};
