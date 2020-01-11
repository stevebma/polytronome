import { Layer } from '../models/layer';
import { Note } from '../models/note.enum'
import { TimeSignature } from '../models/time-signature';

export const TOGGLE_PLAYBACK = 'TOGGLE_PLAYBACK';
export const STOP_PLAYBACK = 'STOP_PLAYBACK';
export const START_PLAYBACK = 'START_PLAYBACK';
export const CHANGE_TEMPO = 'CHANGE_TEMPO';

interface TogglePlaybackAction {
	type: typeof TOGGLE_PLAYBACK;
}

interface StopPlaybackAction {
	type: typeof STOP_PLAYBACK;
}

interface StartPlaybackAction {
	type: typeof START_PLAYBACK;
}

interface ChangeTempoAction {
	type: typeof CHANGE_TEMPO;
	payload: {
		bpm: number;
	};
}

export type PlaybackActionTypes = TogglePlaybackAction | StopPlaybackAction | StartPlaybackAction | ChangeTempoAction;

export const ADD_LAYER = 'ADD_LAYER';
export const EXTEND_LAYER = 'EXTEND_LAYER';
export const SHRINK_LAYER = 'SHRINK_LAYER';
export const CHANGE_LAYER_TIME_SIGNATURE = 'CHANGE_LAYER_TIME_SIGNATURE';
export const TOGGLE_BEAT = 'TOGGLE_BEAT';
export const SET_NOTE = 'SET_NOTE';

interface AddLayerAction {
	type: typeof ADD_LAYER;
	payload: {
		layer: Layer;
	};
}

export interface ExtendLayerActionType {
	type: typeof EXTEND_LAYER;
	payload: {
		index: number;
	};
}

export interface ShrinkLayerActionType {
	type: typeof SHRINK_LAYER;
	payload: {
		index: number;
	};
}

export interface ChangeLayerTimeSignatureActionType {
	type: typeof CHANGE_LAYER_TIME_SIGNATURE;
	payload: {
		index: number;
		time: TimeSignature;
	};
}

export interface SetBeatActionType {
	type: typeof SET_NOTE;
	payload: {
		layerIndex: number;
		barIndex: number;
		beatIndex: number;
		note: Note;
	};
}

export interface ToggleBeatActionType {
	type: typeof TOGGLE_BEAT;
	payload: {
		layerIndex: number;
		barIndex: number;
		beatIndex: number;
	};
}

export type LayerActionTypes =
	| AddLayerAction
	| ExtendLayerActionType
	| ShrinkLayerActionType
	| ChangeLayerTimeSignatureActionType
	| SetBeatActionType
	| ToggleBeatActionType;

export interface LayerState {
	layers: Layer[];
}
