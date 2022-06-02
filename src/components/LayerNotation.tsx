import React, { useEffect, useRef } from 'react';
import { Row } from 'react-bootstrap';
import styled from 'styled-components';
import Vex from 'vexflow';

import type { Bar, Layer} from '../models';

type Props = {
    layer: Layer;
    width?: number;
    height?: number;
};

export const NotationRow = styled(Row)`
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

type Args = { renderer: Vex.Flow.Renderer; width?: number; height: number; layer: Layer; containerEl: HTMLDivElement };

const renderNotation: (args: Args) => void = ({ renderer, width, height, layer, containerEl }) => {
    const autoWidth = width ? width : containerEl.clientWidth;

    // Size our SVG:
    renderer.resize(autoWidth, height);

    // And get a drawing context:
    const context = renderer.getContext();
    context.clear();

    // Create a stave at position 0, 0 of the determined width on the canvas.
    const stave = new Vex.Flow.Stave(0, 0, autoWidth);

    // add a percussion clef + time signature.
    stave.addClef('percussion');
    stave.addTimeSignature(layer.time.toString());

    // add repeat signs
    stave.setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);
    stave.setEndBarType(Vex.Flow.Barline.type.REPEAT_END);

    // connect it to the rendering context and draw the stave
    stave.setContext(context).draw();

    // add all notes
    let notes: Vex.Flow.Note[] = [];

    layer.bars.forEach((bar: Bar, index: number) => {
        const duration: string = layer.time.lower.toString();
        const barNotes = bar.getStaveNotes(1, duration, 'b/4');
        notes = notes.concat(barNotes);

        // render a barline for all except the final bar
        if (index < layer.bars.length - 1) {
            notes.push(new Vex.Flow.BarNote());
        }
    });

    // Create a voice in the layers time signature and add above notes
    Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);

    // Format and justify the notes to given width in pixels.
    // const formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 1024, {align_rests: false, context: context});

    // Render voice
    // voice.draw(context, stave);
};

export const LayerNotationComponent: React.FC<Props> = ({ height = 200, layer, width }) => {
    const notationRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const target = notationRef.current;
        if (!target) {
            return;
        }
        target.textContent = '';
        const renderer: Vex.Flow.Renderer = new Vex.Flow.Renderer(target, Vex.Flow.Renderer.Backends.SVG);
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
