import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Bar } from '../../models/bar';
import { Layer } from '../../models/layer';
import { Note } from '../../models/note.enum';
import { TimeSignature } from '../../models/time-signature';

export interface ScoreState {
    layers: Layer[];
}

const initialState: ScoreState = {
    // 3 over 4
    // layers: [
    //     new Layer(0, new TimeSignature(4, 4), [new Bar(0, [1, 1, 1, 1])]),
    //     new Layer(1, new TimeSignature(3, 4), [new Bar(0, [1, 1, 1])]),
    // ],
    // 7 over 4
    layers: [
        new Layer(0, new TimeSignature(4, 4), [new Bar(0, [1, 0, 1, 0])]),
        new Layer(1, new TimeSignature(7, 8), [new Bar(0, [1, 0, 1, 0, 1, 0, 1])]),
    ],
};

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        addLayer: (state, action: PayloadAction<{ timeSignature: TimeSignature }>) => {
            const index = state.layers.length;
            const { timeSignature } = action.payload;
            state.layers.push(new Layer(index, timeSignature, []));
        },
        extendLayer: (state, action: PayloadAction<number>) => {
            const layerIndex = action.payload;
            if (layerIndex >= 0 && layerIndex < state.layers.length) {
                const copy = Layer.clone(state.layers[layerIndex]);
                state.layers[layerIndex] = copy.extend();
            }
        },
        shrinkLayer: (state, action: PayloadAction<number>) => {
            const layerIndex = action.payload;
            if (layerIndex >= 0 && layerIndex < state.layers.length) {
                const copy = Layer.clone(state.layers[layerIndex]);
                state.layers[layerIndex] = copy.shrink();
            }
        },
        changeNote: (
            state,
            action: PayloadAction<{ layerIndex: number; barIndex: number; beatIndex: number; note: Note }>,
        ) => {
            const { layerIndex, barIndex, beatIndex, note } = action.payload;
            const copy = Layer.clone(state.layers[layerIndex]);
            state.layers[layerIndex] = copy;
            state.layers[layerIndex].bars[barIndex].beats[beatIndex].note = note;
        },
        toggleNote: (
            state,
            action: PayloadAction<{ layerIndex: number; barIndex: number; beatIndex: number; note?: Note }>,
        ) => {
            const { layerIndex, barIndex, beatIndex, note = Note.Play } = action.payload;
            const copy = Layer.clone(state.layers[layerIndex]);
            state.layers[layerIndex] = copy;
            state.layers[layerIndex].bars[barIndex].beats[beatIndex].toggle(note);
        },
        changeTimeSignature: (state, action: PayloadAction<{ layerIndex: number; timeSignature: TimeSignature }>) => {
            const { layerIndex, timeSignature } = action.payload;
            const layers = state.layers.slice();
            layers[layerIndex] = Layer.clone(layers[layerIndex]);
            layers[layerIndex].time = timeSignature;
            return {
                ...state,
                layers,
            };
        },
    },
});

export const { addLayer, extendLayer, shrinkLayer, changeNote, toggleNote, changeTimeSignature } = scoreSlice.actions;

export default scoreSlice.reducer;
