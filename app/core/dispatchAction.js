// @flow
import type { Dispatch } from 'redux';

const dispatchAction = (dispatch: Dispatch, type: Object, payload: mixed) =>
{
    dispatch({ type, payload });
};

export default dispatchAction;
