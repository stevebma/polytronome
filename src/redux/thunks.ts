import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { Channel, Destination, Sequence, Synth, Transport } from 'tone';

import { selectCommonTimeSignature } from './selectors';
import { startPlayback, stopPlayback } from './slices/playback';
import type { RootState } from './store';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export const toggle = (): AppThunk => (dispatch, getState) => {
    const state = getState();
    if (state.playback.isPlaying) {
        dispatch(stop());
    } else {
        dispatch(start());
    }
};

export const start = (): AppThunk => (dispatch, getState) => {
    const state = getState();
    if (!state.playback.isPlaying) {
        if (Transport.state === 'started') {
            return;
        }
        // check if context is in suspended state (autoplay policy)
        // if (audioCtx.state === 'suspended') {
        //    this.audioCtx.resume();
        // }
        dispatch(startPlayback());
        dispatch(startAudio());
    }
};

export const startAudio = (): AppThunk => (dispatch, getState) => {
    const state = getState();
    const layers = state.score.layers;
    const { masterVolumeDb, isMuted, isLayerMuted } = state.audio;
    // private player: Player;
    // private sourceA: Players;
    // private sourceB: Players;

    // master controls
    Destination.volume.value = masterVolumeDb;
    Destination.mute = isMuted;

    // layer0, panned left
    const channel0: Channel = new Channel({ pan: -1, mute: isLayerMuted[0] }).toDestination();
    // layer1, panned right
    const channel1: Channel = new Channel({ pan: 1, mute: isLayerMuted[1] }).toDestination();
    // const centered: Panner = new Panner(0).toDestination();

    const beepA: Synth = new Synth({
        oscillator: {
            // type: 'pulse',
            modulationType: 'sine',
            harmonicity: 5,
        },
        envelope: {
            attack: 0.01,
            decay: 0.01,
            sustain: 0,
            release: 0.01,
        },
    }).connect(channel0);

    beepA.envelope.attackCurve = 'exponential';
    beepA.envelope.releaseCurve = 'exponential';

    const beepB: Synth = new Synth({
        oscillator: {
            // type: 'pulse',
            modulationType: 'sine',
            harmonicity: 5,
        },
        envelope: {
            attack: 0.01,
            decay: 0.01,
            sustain: 0,
            release: 0.01,
        },
    }).connect(channel1);

    const commonTimeSignature = selectCommonTimeSignature(state);

    const bpmStretchFactor = commonTimeSignature.upper / layers[0].time.upper;
    Transport.bpm.value = state.playback.bpm * bpmStretchFactor;
    Transport.timeSignature = commonTimeSignature.toVector(); // e.g. [20, 4];
    // eslint-disable-next-line no-console
    console.log(`transforming to ${commonTimeSignature.toString()}`);
    const velocity = 0.35;
    const sequences: Sequence<string>[] = layers.map(layer => {
        const beep = layer.index === 0 ? beepA : beepB;
        const events: string[] = layer.transformTo(commonTimeSignature);
        // eslint-disable-next-line no-console
        console.dir(events.toString());
        const subdivision = '4n';
        return new Sequence(
            (time, value: string) => {
                if (value === '1') {
                    beep.triggerAttack('G5', time, velocity);
                    //this.sourceA.get(sample).start(time);
                }
            },
            events,
            subdivision,
        ).start(0);
    });
    // eslint-disable-next-line no-console
    sequences.forEach(seq => console.dir(seq));

    /********* experiment: 5 over 4 *********/
    // Transport.bpm.value = state.playback.bpm * 5;
    // Transport.timeSignature = 20; // [20, 4];
    // const loopA: Sequence<string> = new Sequence(
    //     (time, sample: string) => {
    //         if (sample !== '0') {
    //             beepA.triggerAttack('G5', time, velocity);
    //             //this.sourceA.get(sample).start(time);
    //         }
    //     },
    //     ['1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0', '1', '0', '0', '0'],
    //     '4n',
    // ).start(0);
    //
    // const loopB = new Sequence(
    //     (time, sample) => {
    //         if (sample !== '0') {
    //             beepB.triggerAttack('D5', time, velocity);
    //         }
    //     },
    //     ['2', '0', '0', '0', '0', '2', '0', '0', '0', '0', '2', '0', '0', '0', '0', '2', '0', '0', '0', '0'],
    //     '4n',
    // ).start(0);
    /*********************************/
    Transport.start();
};

export const stop = (): AppThunk => (dispatch, getState) => {
    const state = getState();
    if (state.playback.isPlaying) {
        dispatch(stopPlayback());
        if (Transport.state !== 'stopped') {
            Transport.stop();
        }
    }
};
