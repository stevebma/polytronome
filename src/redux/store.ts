import { configureStore } from '@reduxjs/toolkit';

import type { AudioState } from './slices/audio';
import audioReducer from './slices/audio';
import type { PlaybackState } from './slices/playback';
import playbackReducer from './slices/playback';
import type { ScoreState } from './slices/score';
import scoreReducer from './slices/score';

export const createStore = (useDevTools: boolean) => {
    return configureStore({
        devTools: useDevTools,
        reducer: {
            audio: audioReducer,
            playback: playbackReducer,
            score: scoreReducer,
        },
        preloadedState: {},
        middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
    });
};

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];

export type RootState = {
    audio: AudioState;
    playback: PlaybackState;
    score: ScoreState;
};
