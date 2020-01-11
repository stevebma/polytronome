import {
	TOGGLE_PLAYBACK,
	CHANGE_TEMPO,
	ADD_LAYER,
	EXTEND_LAYER,
	SHRINK_LAYER,
	CHANGE_LAYER_TIME_SIGNATURE,
	SET_NOTE,
	TOGGLE_BEAT
} from './types';

import { Layer } from '../models/layer';
import { Note } from '../models/note.enum';
import { TimeSignature } from '../models/time-signature';

export const togglePlayback = () => ({
	type: TOGGLE_PLAYBACK,
});

export const changeTempo = (bpm: number) => ({
	type: CHANGE_TEMPO,
	payload: {
		bpm: bpm,
	},
});

export const addLayer = (layer: Layer) => ({
	type: ADD_LAYER,
	payload: {
		layer: layer,
	},
});

export const shrinkLayer = (index: number) => ({
	type: SHRINK_LAYER,
	payload: {
		index: index,
	},
});

export const extendLayer = (index: number) => ({
	type: EXTEND_LAYER,
	payload: {
		index: index,
	},
});

export const changeLayerTimeSignature = (index: number, time: TimeSignature) => ({
	type: CHANGE_LAYER_TIME_SIGNATURE,
	payload: {
		index: index,
		time: time,
	},
});

export const toggleBeat = (layerIndex: number, barIndex: number, beatIndex: number) => ({
	type: TOGGLE_BEAT,
	payload: {
		layerIndex: layerIndex,
		barIndex: barIndex,
		beatIndex: beatIndex
	},
});

export const setNote = (layerIndex: number, barIndex: number, beatIndex: number, note: Note) => ({
	type: SET_NOTE,
	payload: {
		layerIndex: layerIndex,
		barIndex: barIndex,
		beatIndex: beatIndex,
		note: note
	},
});
