import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';

import type { StepSequencer } from '../StepSequencer';
import { MainControls } from './MainControls';

export default {
    title: 'MainControls',
    component: MainControls,
    args: {
        bpm: 100,
        onMuteToggle: action('muteToggle'),
        onTempoChange: action('tempoChange'),
        onPlaybackToggle: action('playbackToggle'),
        isMuted: false,
        isPlaying: false,
    },
} as ComponentMeta<typeof MainControls>;

const Container = styled.div`
    width: 800px;
    height: 500px;
`;

const Template: ComponentStory<typeof MainControls> = args => (
    <Container>
        <MainControls {...args} />
    </Container>
);

export const Default = Template.bind({});
Default.args = {};

const TemplateWithState: ComponentStory<typeof StepSequencer> = args => {
    const [bpm, setBpm] = useState<number>(177);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    return (
        <Container>
            <MainControls
                {...args}
                bpm={bpm}
                isMuted={isMuted}
                isPlaying={isPlaying}
                onMuteToggle={() => setIsMuted(!isMuted)}
                onPlaybackToggle={() => setIsPlaying(!isPlaying)}
                onTempoChange={(value: number) => setBpm(value)}
            />
        </Container>
    );
};

export const Interactive = TemplateWithState.bind({});
Interactive.args = {};
