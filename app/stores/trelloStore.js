// @flow
import omit from '@tinkoff/utils/object/omit';
import {
    SET_BOARDS,
    PICK_BOARD,
    SAVE_CARDS,
    ADD_LOADING,
    REMOVE_LOADING,
    HIGHLIGHT_CARD_LIST,
} from 'Constants/trelloConstants';

import type { TrelloStoreTypes, Board, List, Card } from 'Types/trelloStore.flow';
import type { Action } from 'Types/store.flow';

type Updates = {
    boards?: Board[],
    loadedLists?: {
        [string]: List[]
    },
    loadedCards?: {
        [string]: Card[]
    },
}
const getInitialStore = () : TrelloStoreTypes =>
{
    let store: TrelloStoreTypes = {
        loadingCards: {},
        boards: [],
        loadedLists: {},
        loadedCards: {},
        pickedCardsId: null,
    };
    const recoveredStore: ?string = window.localStorage.getItem('trelloStore');

    if (!recoveredStore)
    {
        return store;
    }

    try
    {
        const parsedStore = JSON.parse(recoveredStore);

        store = {
            loadingCards: {},
            boards: parsedStore.boards || [],
            loadedLists: parsedStore.loadedLists || {},
            loadedCards: parsedStore.loadedCards || {},
            pickedCardsId: parsedStore.pickedCardsId,
        };
    }
    catch (error)
    {
        console.error('Error, can\'t parse initialStore from localStorage'); // eslint-disable-line no-console
    }
    return store;
};

const initialState: TrelloStoreTypes = getInitialStore();
const mergeToTrelloStore = (state: TrelloStoreTypes, updates: Updates): TrelloStoreTypes =>
{
    const newTrelloStore = { ...state, ...updates };

    window.localStorage.setItem('trelloStore', JSON.stringify(newTrelloStore));

    return newTrelloStore;
};

export default function trelloStore(state: TrelloStoreTypes = initialState, action: Action)
{
    switch (action.type)
    {
        case HIGHLIGHT_CARD_LIST:
            return { ...state, pickedCardsId: action.payload };
        case ADD_LOADING:
            return { ...state, loadingCards: { ...state.loadingCards, ...action.payload } };
        case REMOVE_LOADING:
            return { ...state, loadingCards: omit([action.payload], state.loadingCards) };
        case SET_BOARDS:
            return mergeToTrelloStore(state, { boards: action.payload });
        case PICK_BOARD:
            const loadedLists = { ...state.loadedLists, [action.payload.id]: action.payload.lists };

            return mergeToTrelloStore(state, { loadedLists });
        case SAVE_CARDS:
            const loadedCards = { ...state.loadedCards, [action.payload.id]: action.payload.cards };

            return mergeToTrelloStore(state, { loadedCards });
        default:
            return state;
    }
}
