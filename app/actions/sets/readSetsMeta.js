// @flow
import type { Dispatch } from 'redux';

import type { Set, SetMeta } from 'App/stores/SetsStore.flow';

import dispatchAction from 'Core/dispatchAction';
import { PARSE_SETS_META } from 'Actions/constants/readSets';

function readSetsMeta(rawSets: Set[] = []): SetMeta[]
{
    return rawSets.map(({ id, title, body }: Set) =>
    {
        const [metaString]: string[] = body.split('\u000A');
        const metaArray: string[] = metaString.trim().split(';');

        const meta: SetMeta = metaArray.reduce((result: SetMeta, item: string): SetMeta =>
        {
            const items: string[] = item.trim().split('=');

            return items.length < 2 ? result : {
                ...result,
                [items[0].trim()]: items[1].trim(),
            };
        }, { id, title: '', comment: '' });

        meta.id = id;
        meta.title = title;

        return meta;
    });
}

const readSetsMetaAction = (rawSets: Set[]) => (dispatch: Dispatch) =>
{
    dispatchAction(dispatch, PARSE_SETS_META, readSetsMeta(rawSets));
};

export default readSetsMetaAction;
