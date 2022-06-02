import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface PlaybackState {
    isPlaying: boolean;
    bpm: number;
}

const initialState: PlaybackState = {
    isPlaying: false,
    bpm: 100,
};

export const playbackSlice = createSlice({
    name: 'playback',
    initialState,
    reducers: {
        adjustTempo: (state, action: PayloadAction<number>) => {
            const bpm = action.payload;
            return { ...state, bpm };
        },
        startPlayback: state => {
            return { ...state, isPlaying: true };
        },
        stopPlayback: state => {
            return { ...state, isPlaying: false };
        },
        togglePlayback: state => {
            return { ...state, isPlaying: !state.isPlaying };
        },
    },
});

export const { adjustTempo, startPlayback, stopPlayback, togglePlayback } = playbackSlice.actions;

export default playbackSlice.reducer;
