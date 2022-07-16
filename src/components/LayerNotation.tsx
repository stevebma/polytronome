import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import type { Renderer, Stave, StaveNote } from 'vexflow';
import Vex from 'vexflow';

import type { Bar, Layer } from '../models';

type Props = {
    layer: Layer;
    width?: number;
    height?: number;
};

export const NotationRow = styled.div`
    background: #f8f9fa;
    padding: 1em;
    border: 1px solid grey;
`;

const Notation = styled.div`
    width: 100%;
    background: white;

    // hack to align marcato articulation with stem -- instead of note
    g.vf-modifiers {
        transform: translateX(4px);
        color: green;
    }
`;

type Args = { renderer: Renderer; width?: number; height: number; layer: Layer; containerEl: HTMLDivElement };

const renderNotation: (args: Args) => void = ({ renderer, width, height, layer, containerEl }) => {
    const autoWidth = width ? width : containerEl.clientWidth;
    const measureWidth = autoWidth / layer.bars.length;

    // Size our SVG:
    renderer.resize(autoWidth, height);

    // And get a drawing context:
    const context = renderer.getContext();
    context.clear();

    // add all notes
    let notes: StaveNote[] = [];
    // Create a stave at position 0, 0 of the determined width on the canvas.
    let stave: Stave = new Vex.Flow.Stave(0, 0, measureWidth);
    layer.bars.forEach((bar: Bar, index: number) => {
        if (index === 0) {
            stave = new Vex.Flow.Stave(0, 0, measureWidth);
            // add a percussion clef + time signature.
            stave.addClef('percussion');
            stave.addTimeSignature(layer.time.toString());

            // add repeat signs
            stave.setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);
        }

        if (index > 0) {
            stave = new Vex.Flow.Stave(stave.getX() + measureWidth, 0, measureWidth);
        }
        if (index === layer.bars.length - 1) {
            stave.setEndBarType(Vex.Flow.Barline.type.REPEAT_END);
        }
        const duration: string = layer.time.lower.toString();
        notes = bar.getStaveNotes(1, duration, 'b/4');
        // connect it to the rendering context and draw the stave
        stave.setContext(context).draw();

        // Create a voice in the layers time signature and add above notes
        // ensures a bar line is rendered as well
        Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
    });

    // Format and justify the notes to given width in pixels.
    // const formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 1024, {align_rests: false, context: context});

    // Render voice
    // voice.draw(context, stave);
};

export const LayerNotationComponent: React.FC<Props> = ({ height = 100, layer, width }) => {
    const notationRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const target = notationRef.current;
        if (!target) {
            return;
        }
        target.textContent = '';
        const renderer: Renderer = new Vex.Flow.Renderer(target, Vex.Flow.Renderer.Backends.SVG);
        renderNotation({ renderer, width, height, layer, containerEl: notationRef.current });
    }, [layer, width, height]);

    return (
        <NotationRow>
            <p>
                layer: {layer.index} | time signature: {layer.time.toString()} |{' '}
                {`${layer.size} ${layer.size === 1 ? 'bar' : 'bars'}`}
            </p>
            <Notation ref={notationRef} />
        </NotationRow>
    );
};
