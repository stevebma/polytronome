import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AudioState {
    isMuted: boolean;
    isLayerMuted: Record<number, boolean>;
    masterVolumeDb: number;
}

const initialState: AudioState = {
    isMuted: false,
    isLayerMuted: { 0: false, 1: false },
    masterVolumeDb: 0,
};

export const audioSlice = createSlice({
    name: 'audio',
    initialState,
    reducers: {
        mute: state => {
            return { ...state, isMuted: true };
        },
        unmute: state => {
            return { ...state, isMuted: false };
        },
        toggleMute: state => {
            return { ...state, isMuted: !state.isMuted };
        },
        muteLayer: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            return { ...state, isLayerMuted: { ...state.isLayerMuted, [index]: true } };
        },
        unmuteLayer: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            return { ...state, isLayerMuted: { ...state.isLayerMuted, [index]: false } };
        },
        toggleMuteLayer: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            return { ...state, isLayerMuted: { ...state.isLayerMuted, [index]: !state.isLayerMuted[index] } };
        },
    },
});
export const { mute, unmute, toggleMute, muteLayer, unmuteLayer, toggleMuteLayer } = audioSlice.actions;

export default audioSlice.reducer;
