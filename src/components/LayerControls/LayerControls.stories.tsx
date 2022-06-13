import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { Bar, Layer, TimeSignature } from '../../models';
import { LayerControls } from './LayerControls';

export default {
    title: 'LayerControls',
    component: LayerControls,
    args: {
        rowId: 'sequencer1',
        onBeatClick: action('clicked'),
        onBeatDoubleClick: action('double clicked'),
        layers: [],
    },
} as ComponentMeta<typeof LayerControls>;

const Container = styled.div`
    width: 1000px;
    height: 500px;
`;

const Template: ComponentStory<typeof LayerControls> = args => (
    <Container>
        <LayerControls {...args} />
    </Container>
);

export const SevenOverFour = Template.bind({});
SevenOverFour.args = {
    layers: [
        new Layer(0, new TimeSignature(4, 4), [new Bar(0, [1, 0, 1, 0])]),
        new Layer(1, new TimeSignature(7, 8), [new Bar(0, [1, 0, 1, 0, 1, 0, 1])]),
    ],
};
