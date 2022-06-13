export type ToggleStatus = 'on' | 'off' | 'emphasized';

export type SequencerClickEvent = {
    rowIndex: number;
    index: number;
    groupIndex: number;
    subIndex: number;
};

export type SequencerRowClickEvent = {
    index: number;
    groupIndex: number;
    subIndex: number;
};
