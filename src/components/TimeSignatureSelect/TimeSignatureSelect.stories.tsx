import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';

import { TimeSignature } from '../../models';
import { TimeSignatureSelect } from './TimeSignatureSelect';

export default {
    title: 'TimeSignatureSelect',
    component: TimeSignatureSelect,
    args: {
        onChange: action('changed'),
    },
} as ComponentMeta<typeof TimeSignatureSelect>;

const Container = styled.div`
    width: 160px;
    height: auto;
`;

const Template: ComponentStory<typeof TimeSignatureSelect> = args => (
    <Container>
        <TimeSignatureSelect {...args} />
    </Container>
);

export const FourFour = Template.bind({});
FourFour.args = {
    time: new TimeSignature(4, 4),
};

export const SixEight = Template.bind({});
SixEight.args = {
    time: new TimeSignature(6, 8),
};

const TemplateWithState: ComponentStory<typeof TimeSignatureSelect> = args => {
    const [timeSignature, setTimeSignature] = useState<TimeSignature>(new TimeSignature(4, 4));
    return (
        <Container>
            <TimeSignatureSelect {...args} onChange={value => setTimeSignature(value)} time={timeSignature} />
        </Container>
    );
};

export const Interactive = TemplateWithState.bind({});
Interactive.args = {
    time: new TimeSignature(4, 4),
};
