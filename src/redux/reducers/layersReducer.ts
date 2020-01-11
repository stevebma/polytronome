import {
	ADD_LAYER,
	CHANGE_LAYER_TIME_SIGNATURE,
	EXTEND_LAYER,
	LayerActionTypes,
	LayerState,
	SET_NOTE,
	SHRINK_LAYER,
	TOGGLE_BEAT,
} from '../types';

import {Layer} from '../../models/layer';

const initialState: LayerState = {
	layers: [
		// new Layer(0, new TimeSignature(4, 4), [new Bar(1, [1, 1, 1, 1])]),
		// new Layer(1, new TimeSignature(3, 4), [new Bar(1, [1, 1, 1])])
	],
};

export default function(state = initialState, action: LayerActionTypes) {
	switch (action.type) {
		case ADD_LAYER: {
			return {
				...state,
				layers: [...state.layers, action.payload.layer],
			};
		}
		case EXTEND_LAYER: {
			return {
				...state,
				layers: state.layers.map((layer: Layer) => {
					const copy = Layer.clone(layer);
					return (layer.index === action.payload.index) ? copy.extend() : copy;
				})
			};
		}
		case SHRINK_LAYER: {
			return {
				...state,
				layers: state.layers.map((layer: Layer) => {
					const copy =  Layer.clone(layer);
					return (layer.index === action.payload.index) ? copy.shrink() : copy;
				})
			};
		}
		case CHANGE_LAYER_TIME_SIGNATURE: {
			let result = { ...state, layers: state.layers.slice() };
			const index: number = action.payload.index;
			result.layers[index] = Layer.clone(result.layers[index]);
			result.layers[index].time = action.payload.time;
			return result;
		}
		case SET_NOTE: {
			const { layerIndex, barIndex, beatIndex} = action.payload;
			let result = { ...state, layers: state.layers.slice() };
			result.layers[layerIndex].bars[barIndex].beats[beatIndex].note = action.payload.note;
			return result;
		}
		case TOGGLE_BEAT: {
			const { layerIndex, barIndex, beatIndex} = action.payload;
			let result = { ...state, layers: state.layers.slice() };
			result.layers[layerIndex].bars[barIndex].beats[beatIndex].toggle();
			return result;
		}
		default:
			return state;
	}
}
