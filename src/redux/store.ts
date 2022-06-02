import { configureStore } from '@reduxjs/toolkit';

import audioReducer from './slices/audio';
import playbackReducer from './slices/playback';
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

export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
