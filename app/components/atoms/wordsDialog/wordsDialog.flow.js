// @flow
export type Set = 'currentSetData' | 'currentIterationSet' | 'currentSetRight' | 'currentSetWrong';

export type DialogConfig = {
    listName: Set,
    dialogHeader: string,
    canRevert: boolean,
    clickable: boolean,
};

export type DialogsConfigs = {
    [Set]: DialogConfig
};
