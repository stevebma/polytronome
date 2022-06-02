import { lcm } from '../math';
import { TimeSignature } from '../models';
import type { RootState } from './store';

export const selectCommonTimeSignature = (state: RootState): TimeSignature => {
    const { layers } = state.score;
    if (layers.length <= 1) {
        return layers[0].time;
    }
    const time0: TimeSignature = layers[0].time.multiply(layers[0].size);
    const time1: TimeSignature = layers[1].time.multiply(layers[1].size);
    const upper = lcm(time0.upper, time1.upper);
    const lower = lcm(time0.lower, time1.lower);
    return new TimeSignature(upper, lower);
};
