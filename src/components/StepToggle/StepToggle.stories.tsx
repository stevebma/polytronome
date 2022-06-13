import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import type { ToggleStatus } from '../../types';
import { StepToggle } from './StepToggle';

export default {
    title: 'BeatToggle',
    component: StepToggle,
    args: {
        label: '1',
        color: 'rgb(0, 245, 245)',
        onClick: action('clicked'),
        onDoubleClick: action('clicked'),
        status: 'on',
    },
} as ComponentMeta<typeof StepToggle>;

const Template: ComponentStory<typeof StepToggle> = args => (
    <div style={{ width: '600px', height: '600px' }}>
        <StepToggle {...args} />
    </div>
);

export const On = Template.bind({});
On.args = {};

export const Off = Template.bind({});
Off.args = {
    status: 'off',
};

export const Emphasized = Template.bind({});
Emphasized.args = {
    status: 'emphasized',
};

const TemplateWithState: ComponentStory<typeof StepToggle> = args => {
    const [status, setStatus] = useState<ToggleStatus>('on');
    const toggle = () => {
        setStatus(status !== 'off' ? 'off' : 'on');
    };
    const toggleEmphasized = () => {
        setStatus(status !== 'emphasized' ? 'emphasized' : 'off');
    };
    return (
        <div style={{ width: '600px', height: '600px' }}>
            <StepToggle {...args} onClick={toggle} onDoubleClick={toggleEmphasized} status={status} />
        </div>
    );
};

export const Interactive = TemplateWithState.bind({});
Interactive.args = {};
