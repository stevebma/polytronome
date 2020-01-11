import { combineReducers } from 'redux';
import playbackReducer from './playbackReducer';
import layersReducer from './layersReducer';
import { Layer } from '../../models/layer';

export const rootReducer = combineReducers({
	playback: playbackReducer,
	layers: layersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// export type RootState = {
// 	playback: {
// 		isPlaying: boolean,
// 		bpm: number,
// 	}
// 	layers: {
// 		layers: Layer[],
// 	}
// }
