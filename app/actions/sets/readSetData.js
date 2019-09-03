// @flow
import type { Dispatch } from 'redux';

import find from '@tinkoff/utils/array/find';

import type { Set, SetData } from 'Stores/SetsStore.flow';
import type { ActionProto } from 'Types/common';

import dispatchAction from 'Core/dispatchAction';
import { PARSE_CURRENT_SET_DATA } from '../constants/readSets';

const getAttrsFromTrelloString = item =>
{
    const splitByDoubleColon = item.trim().split('::');

    splitByDoubleColon.shift(); // delete left part of string

    if (splitByDoubleColon.length) // if we have attributes
    {
        splitByDoubleColon[0] = splitByDoubleColon[0].trim(); // delete all spaces

        const strAttrs = splitByDoubleColon.join(''); // transform to string
        const arrAttrs = strAttrs.split(';'); // transform to attributes' array
        const objAttrs = {}; // create void object
        const trimmedArrAttrs = arrAttrs.map(attr => attr.trim());

        trimmedArrAttrs.forEach(attr =>
        {
            if (attr.length === 1) { objAttrs[attr] = true; } // if it is not an Example attr we assing true to attr's value
            if (attr.length > 1) // if it is an Example attribute we assign comment to attr's value
            {
                const tmp = attr.split('=');

                tmp[0] = tmp[0].trim();
                objAttrs[tmp[0]] = tmp[1];
            }
        });

        return objAttrs; // we return attr object
    }

    return {}; // if we don't have attributes we return void object
};

function parseSetData(dataString: string): SetData[]
{
    const wordsStrings = dataString.trim().split('\u000A');

    wordsStrings.shift();

    let counter = 0;

    return wordsStrings.map(item =>
    {
        counter += 1;

        if (!/[|]/g.test(item))
        {
            return {
                id: counter,
                foreign: '',
                transcription: '',
                ru: '',
                error: `"${item}" - cлово некорректного формата!`,
            };
        }

        const words = item.trim().split('|');
        const ruIdx = words.length > 2 ? 2 : 1;
        const transcription = words.length > 2 ? words[1].trim() : '';

        words[words.length - 1] = words[words.length - 1].trim().split('::').shift(); // delete attrs from ru word

        return {
            id: counter,
            foreign: words[0].trim(),
            transcription,
            ru: words[ruIdx].trim(),
            attrs: getAttrsFromTrelloString(item),
        };
    });
}

const readSetData: ActionProto<string, SetData[]> = (inId: string) => (dispatch: Dispatch, getState: Function): Promise<SetData[]> =>
{
    const sets: Set[] = getState().SetsStore.sets;
    const data: Set = find(({ id }) => inId === id)(sets);
    const payload: SetData[] = data && parseSetData(data.body);

    data && dispatchAction(dispatch, PARSE_CURRENT_SET_DATA, payload);

    return Promise.resolve(payload);
};

export default readSetData;
