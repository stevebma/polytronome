import { TOGGLE_PLAYBACK, CHANGE_TEMPO, PlaybackActionTypes } from '../types';

const initialState = {
	isPlaying: false,
	bpm: 100,
};

export default function(state = initialState, action: PlaybackActionTypes) {
	switch (action.type) {
		case TOGGLE_PLAYBACK: {
			return {
				...state,
				isPlaying: !state.isPlaying,
			};
		}
		case CHANGE_TEMPO: {
			return {
				...state,
				bpm: action.payload.bpm,
			};
		}
		default:
			return state;
	}
}
