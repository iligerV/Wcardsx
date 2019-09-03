// @flow
import Url from 'url';

import type { Dispatch } from 'redux';
import type { ActionProto } from 'Types/common';

import {
    PARSE_URL,
} from 'Actions/constants/tracking';

import dispatchAction from '../core/dispatchAction';

const parseUrl: ActionProto<typeof undefined, null> = () => (dispatch: Dispatch) =>
{
    const parse = Url.parse(location.href, true);

    dispatchAction(dispatch, PARSE_URL, parse);

    return Promise.resolve(null);
};

export default parseUrl;
