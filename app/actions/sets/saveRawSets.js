// @flow
import type { Dispatch } from 'redux';
import type { Card } from 'Types/trelloStore.flow';
import type { Set } from 'Stores/SetsStore.flow';

import map from '@tinkoff/utils/array/map';

import {
    SAVE_RAW_SETS,
} from 'Actions/constants/readSets';
import dispatchAction from 'Core/dispatchAction';

const omitCardsParams = ({ id, name, desc }): Set => ({
    id,
    title: name,
    body: desc,
});

const saveRawSets = (cards: Card[]) => (dispatch: Dispatch): Set[] =>
{
    const rawSets = map(omitCardsParams, cards);

    dispatchAction(dispatch, SAVE_RAW_SETS, rawSets);

    return rawSets;
};

export default saveRawSets;
