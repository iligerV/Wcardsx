// @flow
import type { Dispatch } from 'redux';
import type { Card } from 'Types/trelloStore.flow';
import type { Set } from 'Stores/SetsStore.flow';

import getCards from 'App/api/getCards';
import saveCards from 'Actions/saveCards';
import saveRawSets from 'Actions/sets/saveRawSets';
import readSetDataAction from 'Actions/sets/readSetData';
import readSetsMetaAction from 'Actions/sets/readSetsMeta';
import dispatchAction from 'Core/dispatchAction';
import {
    ADD_LOADING,
    REMOVE_LOADING,
    HIGHLIGHT_CARD_LIST,
} from 'Constants/trelloConstants';


const downloadListCards = (cardId: string, id: ?string) => (dispatch: Dispatch, getState: Function) =>
{
    dispatchAction(dispatch, ADD_LOADING, { [cardId]: true });
    dispatchAction(dispatch, HIGHLIGHT_CARD_LIST, cardId);
    return setTimeout(() => {
        return getCards(cardId)
            .then((cards: Card[]) =>
            {
                saveCards(dispatch)({ id: cardId, cards });
                return cards;
            })
            .then((cards: Card[]) => saveRawSets(cards)(dispatch))
            .then((rawSets: Set[]) => readSetsMetaAction(rawSets)(dispatch))
            .then(() => readSetDataAction(id)(dispatch, getState))
            .finally(() => dispatchAction(dispatch, REMOVE_LOADING, cardId));
    }, 800);
};

export default downloadListCards;
