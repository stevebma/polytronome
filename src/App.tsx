import './math';
import 'vexflow';

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Vex from 'vexflow';

import { LayerControls } from './components/LayerControls';
import { LayerNotationComponent } from './components/LayerNotation';
import { MainControls } from './components/MainControls/MainControls';
import type { Layer, TimeSignature } from './models';
import { Note } from './models';
import { useAppDispatch } from './redux/hooks';
import { selectCommonTimeSignature } from './redux/selectors';
import { toggleMute, toggleMuteLayer } from './redux/slices/audio';
import { adjustTempo } from './redux/slices/playback';
import { changeNote, changeTimeSignature, extendLayer, shrinkLayer, toggleNote } from './redux/slices/score';
import type { RootState } from './redux/store';
import { toggle } from './redux/thunks';
import type { SequencerClickEvent } from './types';

type Props = {
    /* none yet */
};

const renderCommonLayer = (targetEl: HTMLDivElement, layers: Layer[], commonTimeSignature: TimeSignature): void => {
    if (layers.length <= 1) {
        return;
    }
    targetEl.innerHTML = '';
    const width = targetEl.getBoundingClientRect().width;
    const height = 100;
    const renderer = new Vex.Flow.Renderer(targetEl, Vex.Flow.Renderer.Backends.SVG);
    renderer.resize(width, height);

    // And get a drawing context:
    const context = renderer.getContext();
    context.clear();

    // Create a stave at position 10, 40 of width 400 on the canvas.
    const stave = new Vex.Flow.Stave(0, 0, width);

    // Add a clef and time signature.
    stave.addClef('percussion');
    stave.addTimeSignature(commonTimeSignature.toString());
    stave.setBegBarType(Vex.Flow.Barline.type.REPEAT_BEGIN);
    stave.setEndBarType(Vex.Flow.Barline.type.REPEAT_END);
    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    // const voices = [];
    const layerKeys = ['e/4', 'g/5', 'b/4'];
    layers.forEach((layer, index) => {
        const scaling: number = commonTimeSignature.upper / layer.time.upper;
        const notes = layer.getStaveNotes(scaling, layerKeys[index], commonTimeSignature.lower.toString());
        Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
    });
};

const CombinedNotationWrap = styled.div`
    padding: 1em;
    width: 100%;
    height: 150px;
`;

const CombinedNotation = styled.div`
    width: 100%;
`;

const Container = styled.div`
    min-width: 800px;
    max-width: 1280px;
    margin: 0 auto;
`;

const Row = styled.div`
    width: 100%;
`;

const MainControlsRow = styled.div`
    width: 100%;
    margin: 20px 0;
`;

export const App: React.FC<Props> = () => {
    const dispatch = useAppDispatch();
    const combinedNotation = useRef<HTMLDivElement>(null);
    const handleTempoChange = (value: number) => {
        dispatch(adjustTempo(value));
    };

    const handleTimeSignatureChange = (layerIndex: number, timeSignature: TimeSignature) => {
        dispatch(changeTimeSignature({ layerIndex, timeSignature }));
    };

    const handleBeatClick = (layerIndex: number, barIndex: number, beatIndex: number) => {
        dispatch(toggleNote({ layerIndex, barIndex, beatIndex }));
    };

    const handleBeatDoubleClick = (layerIndex: number, barIndex: number, beatIndex: number) => {
        dispatch(changeNote({ layerIndex, barIndex, beatIndex, note: Note.Accent }));
    };

    const handleMuteToggle = () => {
        dispatch(toggleMute());
    };

    const handlePlaybackToggle = () => {
        dispatch(toggle());
    };

    const { bpm, isPlaying } = useSelector((state: RootState) => state.playback);
    const { layers } = useSelector((state: RootState) => state.score);
    const { isMuted, isLayerMuted } = useSelector((state: RootState) => state.audio);
    const commonTimeSignature = useSelector(selectCommonTimeSignature);

    useEffect(() => {
        if (!combinedNotation.current) {
            return;
        }
        renderCommonLayer(combinedNotation.current, layers, commonTimeSignature);
    }, [commonTimeSignature, layers]);

    return (
        <Container>
            {layers.map((layer: Layer) => {
                return <LayerNotationComponent key={layer.index} layer={layer} />;
            })}
            <Row>
                <CombinedNotationWrap>
                    <CombinedNotation ref={combinedNotation} />
                </CombinedNotationWrap>
            </Row>
            <MainControlsRow>
                <MainControls
                    bpm={bpm}
                    isMuted={isMuted}
                    isPlaying={isPlaying}
                    onMuteToggle={handleMuteToggle}
                    onPlaybackToggle={handlePlaybackToggle}
                    onTempoChange={handleTempoChange}
                />
            </MainControlsRow>
            <LayerControls
                isDisabled={isPlaying}
                isLayerMuted={isLayerMuted}
                layers={layers}
                onBeatClick={(evt: SequencerClickEvent) => handleBeatClick(evt.rowIndex, evt.groupIndex, evt.subIndex)}
                onBeatDoubleClick={(evt: SequencerClickEvent) =>
                    handleBeatDoubleClick(evt.rowIndex, evt.groupIndex, evt.subIndex)
                }
                onExtend={(layerIndex: number) => {
                    dispatch(extendLayer(layerIndex));
                }}
                onMuteToggle={layerIndex => {
                    dispatch(toggleMuteLayer(layerIndex));
                }}
                onShrink={layerIndex => {
                    dispatch(shrinkLayer(layerIndex));
                }}
                onTimeSignatureChange={handleTimeSignatureChange}
            />
        </Container>
    );
};
