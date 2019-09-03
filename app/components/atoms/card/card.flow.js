// @flow

import type { SetData } from 'Stores/SetsStore.flow';
import type { Action } from 'Types/common';

export type CardProps = {
    word: SetData,
    noRememberLater: boolean,
    openCurrentIterationSet: Function,
    rememberLater: Action,
};
