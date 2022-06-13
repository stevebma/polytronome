import type { MouseEventHandler } from 'react';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import type { Renderer } from 'vexflow';
import Vex from 'vexflow';

type Props = {
    duration: number;
    height?: number; // in pixels
    label: string;
    onClick?: MouseEventHandler;
    width?: number; // in pixels
};

const NoteWrapper = styled.div`
    zoom: 0.6;
    display: inline;
`;

const NoteLabel = styled.span`
    color: black;
    font-weight: bold;
`;

type DrawSingleNoteArgs = { renderer: Renderer; width: number; height: number; duration: number };

const drawSingleNote: (args: DrawSingleNoteArgs) => void = ({ renderer, width, height, duration }) => {
    renderer.resize(width, height);
    const context = renderer.getContext();
    context.clear();
    const stave = new Vex.Flow.Stave(0, -10, width);
    const note = new Vex.Flow.StaveNote({
        keys: ['b/4'],
        duration: duration.toString(),
        stem_direction: 1,
    });
    const voice = new Vex.Flow.Voice({ num_beats: 1, beat_value: duration });
    voice.addTickables([note]);
    const formatter = new Vex.Flow.Formatter();
    formatter.joinVoices([voice]).format([voice], width);
    voice.draw(context, stave);
};

export const SingleNote: React.FC<Props> = ({
    duration,
    height = 75,
    label,
    onClick = () => {
        /* noop */
    },
    width = 50,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const target = containerRef.current;
        if (!target) {
            return;
        }
        target.textContent = '';
        const renderer: Renderer = new Vex.Flow.Renderer(target, Vex.Flow.Renderer.Backends.SVG);
        drawSingleNote({ renderer, width, height, duration });
    }, [duration, width, height]);

    return (
        <NoteWrapper onClick={onClick} ref={containerRef}>
            <NoteLabel>{label}</NoteLabel>
        </NoteWrapper>
    );
};
