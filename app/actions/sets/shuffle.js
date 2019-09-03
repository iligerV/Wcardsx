// @flow
import type Context from 'Core/Context';
import type { Dispatch } from 'redux';
import type { ActionProto } from 'Types/common';
import type { SetData } from 'Stores/SetsStore.flow';

import dispatchAction from 'Core/dispatchAction';
import setCurrListHash from 'Actions/sets/setCurrListHash';
import { SHUFFLE_CURRENT_SET_DATA } from 'Actions/constants/readSets';

function shuffleArray(array: any[]): any[]
{
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0)
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const shuffle: ActionProto<void, null> = () => (dispatch: Dispatch, getState: Function, context: Context) =>
{
    const currentIterationSet: SetData[] = getState().SetsStore.currentIterationSet;
    const shuffledSet = shuffleArray([...currentIterationSet]);

    context.executeAction(setCurrListHash, shuffledSet);
    dispatchAction(dispatch, SHUFFLE_CURRENT_SET_DATA, shuffledSet);
};

export default shuffle;
