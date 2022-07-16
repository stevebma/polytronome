import type { ComponentStory, Story } from '@storybook/react';
import type { ComponentMeta } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { EighthNote } from './EighthNote';
import { HalfNote } from './HalfNote';
import { NoteIcon } from './NoteIcon';
import { QuarterNote } from './QuarterNote';
import { SixteenthNote } from './SixteenthNote';
import { WholeNote } from './WholeNote';

export default {
    title: 'NoteIcon',
    component: NoteIcon,
    args: {
        duration: 4,
    },
} as ComponentMeta<typeof NoteIcon>;

const SmallWrapper = styled.div`
    width: 50px;
    height: 100px;
    display: inline-block;
    margin-right: 1em;
`;

const BigWrapper = styled.div`
    width: 150px;
    height: 600px;
`;

const Template: ComponentStory<typeof NoteIcon> = args => (
    <BigWrapper>
        <NoteIcon {...args} />
    </BigWrapper>
);

export const Single = Template.bind({});
Single.args = {
    color: '#333',
};

const AllNotesTemplate: Story = args => (
    <>
        <SmallWrapper>
            <WholeNote color={args.color} />
        </SmallWrapper>
        <SmallWrapper>
            <HalfNote color={args.color} />
        </SmallWrapper>
        <SmallWrapper>
            <QuarterNote color={args.color} />
        </SmallWrapper>
        <SmallWrapper>
            <EighthNote color={args.color} />
        </SmallWrapper>
        <SmallWrapper>
            <SixteenthNote color={args.color} />
        </SmallWrapper>
    </>
);

export const AllNotes = AllNotesTemplate.bind({});
AllNotes.args = {
    color: '#333',
};
export const AllNotesGreen = AllNotesTemplate.bind({});
AllNotesGreen.args = {
    color: 'green',
};
