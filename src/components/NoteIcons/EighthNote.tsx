import React from 'react';

import type { IconProps } from './index';

export const EighthNote = ({ color = '#000' }: IconProps): JSX.Element => {
    return (
        <svg preserveAspectRatio="none" viewBox="0 0 25 50" xmlns="http://www.w3.org/2000/svg">
            <g className="vf-stavenote" transform="matrix(1, 0, 0, 1, -17, -17)">
                <g className="vf-stem">
                    <path
                        d="M28.184 53L28.184 23"
                        fill="none"
                        stroke={color}
                        strokeDasharray="none"
                        strokeWidth="1.5"
                    />
                </g>
                <g className="vf-notehead" pointerEvents="bounding-box">
                    <path
                        d="M20.9312 60.0544C24.52544 60.0544,28.934 56.74096,28.934 53.3152C28.934 51.23728,27.30536 49.9456,25.0028 49.9456C20.56616 49.9456,17 53.23096,17 56.6848C17 58.7908,18.74096 60.0544,20.9312 60.0544"
                        fill={color}
                        stroke="none"
                        strokeDasharray="none"
                        strokeWidth="0.3"
                    />
                </g>
                <g className="vf-flag" pointerEvents="bounding-box">
                    <path
                        d="M37.06544 49.95504C37.06544 49.95504,38.1044 46.10808,38.1044 42.93504C38.1044 37.88064,35.998400000000004 33.13512,33.4712 29.0916C31.39328 25.89048,29.70848 22.40856,29.062640000000002 18.53352C28.922240000000002 17.88768,28.61336 17.63496,28.19216 17.63496C27.770960000000002 17.63496,27.434 17.74728,27.434 18.25272L27.434 27.91224C30.1016 28.3896,33.94856 33.893280000000004,35.40872 37.31904C35.998400000000004 38.69496,36.36344 40.99752,36.36344 43.38432C36.36344 45.20952,36.08264 47.11896,35.40872 48.94416C35.32448 49.168800000000005,35.26832 49.36536,35.26832 49.53384C35.26832 50.17968,35.68952 50.54472,35.91416 50.7132C36.16688 50.88168,36.868880000000004 50.62896,37.06544 49.95504"
                        fill={color}
                        stroke="none"
                        strokeDasharray="none"
                        strokeWidth="0.3"
                    />
                </g>
            </g>
        </svg>
    );
};
