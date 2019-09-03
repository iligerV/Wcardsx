// @flow
import type { Dispatch } from 'redux';

import indexBy from 'Utils/array/indexBy';

import dispatchAction from '../core/dispatchAction';
import { INDEX_ROUTES } from './constants/common';

import routes from '../../src/routes';

/**
 * @deprecated
 */
function indexRoutes()
{
    return (dispatch: Dispatch) =>
    {
        dispatchAction(dispatch, INDEX_ROUTES, indexBy(itm => itm.id, routes));
    };
}

export default indexRoutes;
