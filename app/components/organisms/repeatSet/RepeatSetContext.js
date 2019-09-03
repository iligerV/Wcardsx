// @flow
import React from 'react';
import type { SetData } from 'Stores/SetsStore.flow';

export type RepeatSetContextType = {
    wordsRight?: SetData[],
    wordsWrong?: SetData[],
};

const context: RepeatSetContextType = {
    wordsRight: [],
    wordsWrong: [],
};

export default React.createContext(context);
