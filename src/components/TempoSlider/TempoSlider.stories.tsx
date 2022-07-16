import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import type { Duration } from '../../types';
import { TempoSlider } from './TempoSlider';

export default {
    title: 'TempoSlider',
    component: TempoSlider,
    args: {
        max: 100,
        min: 20,
        onChange: action('changed'),
        value: 80,
    },
} as ComponentMeta<typeof TempoSlider>;

const Template: ComponentStory<typeof TempoSlider> = args => <TempoSlider {...args} />;

export const Default = Template.bind({});
Default.args = {};

const TemplateWithState: ComponentStory<typeof TempoSlider> = args => {
    const [tempo, setTempo] = useState<number>(120);
    return <TempoSlider {...args} onChange={value => setTempo(value as Duration)} value={tempo} />;
};

export const Interactive = TemplateWithState.bind({});
Interactive.args = {
    label: 'Tempo',
    max: 200,
    min: 10,
};
