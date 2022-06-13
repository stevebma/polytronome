import { darken, lighten, transparentize } from 'polished';
import type { MouseEvent } from 'react';
import React, { useRef } from 'react';
import styled from 'styled-components';
import useDoubleClick from 'use-double-click';

import type { ToggleStatus } from '../../types';

const transitionDuration = '100ms';
const borderRadius = '10px';
const borderSize = '2px';
const glowSize = '3px';

const makeGradient = (color: string) => `
    radial-gradient(
        circle at center,
        ${color} 0,
        ${darken(0.1, color)} 40%,
        ${darken(0.2, color)} 100%
    )
`;

const StyledButton = styled.button<{ color: string; isHighlighted: boolean; status: ToggleStatus }>`
    background-color: ${props => props.color};
    background-image: ${props => makeGradient(props.color)};
    border-radius: ${borderRadius};
    border: ${borderSize} solid ${props => darken(0.21, props.color)};
    cursor: pointer;
    height: 100%;
    padding: 0;
    position: relative;
    transition: border ${transitionDuration} ease-in, box-shadow 100ms ease-in-out;
    width: 100%;
    z-index: 1;
    box-shadow: 0 0 ${glowSize} ${glowSize} rgba(34, 34, 34, 0.2);
    // button hover state
    &:hover {
        box-shadow: 0 0 ${glowSize} ${glowSize} ${props => transparentize(0.5, darken(0.15, props.color))};
    }
    // button click
    &:active {
        box-shadow: 0 0 ${glowSize} ${glowSize} ${props => transparentize(0.1, darken(0.15, props.color))};
    }

    min-width: 20px;
    min-height: 20px;

    // "glowing bulb" gradient
    &::after {
        background-color: ${props => lighten(0.05, props.color)};
        background-image: ${props => makeGradient(lighten(0.05, props.color))};
        border-radius: ${borderRadius};
        border: none;
        bottom: 0;
        content: '';
        height: 100%;
        left: 0;
        opacity: ${props => (props.status === 'off' ? 0 : 0.9)};
        pointer-events: none;
        position: absolute;
        right: 0;
        top: 0;
        transition: opacity ${transitionDuration} ease-in-out;
        width: 100%;
        z-index: 2;
    }
`;

const getLightStatusColor = (baseColor: string, status: ToggleStatus) => {
    switch (status) {
        case 'on': {
            return darken(0.1, baseColor);
        }
        case 'emphasized': {
            return lighten(0.05, baseColor);
        }
        case 'off':
        default: {
            return darken(0.2, baseColor);
        }
    }
};

const Wrapper = styled.div`
    cursor: pointer;
    height: 100%;
    padding: 0;
    position: relative;
    transition: border ${transitionDuration} ease-in, box-shadow ${transitionDuration} ease-in-out;
    width: 100%;
`;

const StyledLabel = styled.div<{ color: string; highlight?: boolean; addCircle?: boolean }>`
    align-items: center;
    background: ${props =>
        props.addCircle
            ? `radial-gradient(40px circle at center, ${transparentize(
                  0.35,
                  darken(0.1, props.color),
              )} 50%, transparent 51%)`
            : 'transparent'};
    color: ${props => (props.highlight ? 'rgb(255,255,255)' : darken(0.1, props.color))};
    display: flex;
    font-family: sans-serif;
    font-size: 25px;
    height: 100%;
    justify-content: center;
    pointer-events: none;
    position: absolute;
    text-align: center;
    width: 100%;
    z-index: 5;
`;

type StepToggleProps = {
    color?: string;
    isDisabled?: boolean;
    isHighlighted?: boolean;
    label?: string;
    onClick?: (evt: MouseEvent) => void;
    onDoubleClick?: (evt: MouseEvent) => void;
    status?: ToggleStatus;
};

export const StepToggle: React.FC<StepToggleProps> = ({
    color = '#555',
    isDisabled = false,
    isHighlighted = false,
    label = '',
    onClick,
    onDoubleClick,
    status = 'off',
}) => {
    const buttonRef = useRef(null);
    // allowing both single- and double clicks introduces some latency
    useDoubleClick({
        latency: 250,
        onDoubleClick: evt => {
            evt.preventDefault();
            onDoubleClick && onDoubleClick(evt);
        },
        onSingleClick: evt => {
            evt.preventDefault();
            onClick && onClick(evt);
        },
        ref: buttonRef,
    });
    return (
        <Wrapper>
            {label && (
                <StyledLabel addCircle={status === 'emphasized'} color={color} highlight={status !== 'off'}>
                    {label}
                </StyledLabel>
            )}
            <StyledButton
                color={getLightStatusColor(color, status)}
                disabled={isDisabled}
                isHighlighted={isHighlighted}
                ref={buttonRef}
                status={status}
            />
        </Wrapper>
    );
};
