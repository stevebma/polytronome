import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';

import type { SequencerClickEvent, ToggleStatus } from '../../types';
import { StepSequencer } from './StepSequencer';

export default {
    title: 'StepSequencer',
    component: StepSequencer,
    args: {
        rowId: 'sequencer1',
        onBeatClick: action('clicked'),
        onBeatDoubleClick: action('double clicked'),
        rows: [
            {
                groupSize: 3,
                steps: ['emphasized', 'off', 'off', 'emphasized', 'off', 'off', 'emphasized', 'off', 'off'],
            },
            { groupSize: 4, steps: ['emphasized', 'off', 'off', 'off', 'on', 'off', 'off', 'off'] },
            {
                groupSize: 5,
                steps: ['emphasized', 'off', 'off', 'off', 'off', 'emphasized', 'off', 'off', 'off', 'off'],
            },
            { groupSize: 6, steps: ['emphasized', 'on', 'on', 'on', 'on', 'on'] },
            { groupSize: 7, steps: ['on', 'off', 'on', 'off', 'on', 'off', 'on'] },
        ],
    },
} as ComponentMeta<typeof StepSequencer>;

const Container = styled.div`
    width: 1000px;
    height: 500px;
`;

const Template: ComponentStory<typeof StepSequencer> = args => (
    <Container>
        <StepSequencer {...args} />
    </Container>
);

export const FiveRows = Template.bind({});
FiveRows.args = {};

const TemplateWithState: ComponentStory<typeof StepSequencer> = args => {
    const [rows, setRows] = useState<{ groupSize: number; steps: ToggleStatus[] }[]>(args.rows);
    const toggle = (evt: SequencerClickEvent) => {
        const { rowIndex, index } = evt;
        const modified = [...rows];
        modified[rowIndex].steps[index] = modified[rowIndex].steps[index] !== 'off' ? 'off' : 'on';
        setRows(modified);
    };
    const toggleEmphasized = (evt: SequencerClickEvent) => {
        const { rowIndex, index } = evt;
        const modified = [...rows];
        modified[rowIndex].steps[index] = 'emphasized';
        setRows(modified);
    };
    return (
        <Container>
            <StepSequencer {...args} onBeatClick={toggle} onBeatDoubleClick={toggleEmphasized} rows={rows} />
        </Container>
    );
};

export const Interactive = TemplateWithState.bind({});
Interactive.args = {};
