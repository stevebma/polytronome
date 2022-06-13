import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';

import type { SequencerRowClickEvent, ToggleStatus } from '../../types';
import { StepSequencerRow } from './StepSequencerRow';

const orange = 'rgb(210, 158, 64)';
const green = 'rgb(101, 207, 76)';

export default {
    title: 'StepSequencerRow',
    component: StepSequencerRow,
    args: {
        rowId: 'row1',
        color: orange,
        onBeatClick: action('clicked'),
        onBeatDoubleClick: action('double clicked'),
        steps: ['emphasized', 'off', 'off', 'off', 'on', 'off', 'off', 'off'],
        groupSize: 4,
    },
} as ComponentMeta<typeof StepSequencerRow>;

const Container = styled.div`
    width: 800px;
    height: 100px;
`;

const Template: ComponentStory<typeof StepSequencerRow> = args => (
    <Container>
        <StepSequencerRow {...args} />
    </Container>
);

export const Simple = Template.bind({});
Simple.args = {};

const TemplateWithState: ComponentStory<typeof StepSequencerRow> = args => {
    const [steps, setSteps] = useState<ToggleStatus[]>(args.steps);
    const toggle = (evt: SequencerRowClickEvent) => {
        const { index } = evt;
        const modified = [...steps];
        modified[index] = modified[index] !== 'off' ? 'off' : 'on';
        setSteps(modified);
    };
    const toggleEmphasized = (evt: SequencerRowClickEvent) => {
        const { index } = evt;
        const modified = [...steps];
        modified[index] = modified[index] !== 'emphasized' ? 'emphasized' : 'off';
        setSteps(modified);
    };
    return (
        <div style={{ width: '400px', height: '50px' }}>
            <StepSequencerRow {...args} onBeatClick={toggle} onBeatDoubleClick={toggleEmphasized} steps={steps} />
        </div>
    );
};

export const Interactive = TemplateWithState.bind({});
Interactive.args = {
    color: green,
};
