import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import type { Duration } from '../../types';
import { NoteLengthSelect } from './NoteLengthSelect';

export default {
    title: 'NoteLengthSelect',
    component: NoteLengthSelect,
    args: {
        choices: [2, 4, 8],
        value: 8,
        onChange: action('changed'),
    },
} as ComponentMeta<typeof NoteLengthSelect>;

const Template: ComponentStory<typeof NoteLengthSelect> = args => <NoteLengthSelect {...args} />;

export const Default = Template.bind({});
Default.args = {};

const TemplateWithState: ComponentStory<typeof NoteLengthSelect> = args => {
    const [noteLength, setNoteLength] = useState<Duration>(4);
    return <NoteLengthSelect {...args} onChange={value => setNoteLength(value as Duration)} value={noteLength} />;
};

export const Interactive = TemplateWithState.bind({});
Interactive.args = {
    choices: [1, 2, 4, 8, 16],
    label: '',
};
