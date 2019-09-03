// @flow
import type { Dispatch } from 'redux';
import type { ActionProto } from 'Types/common';

import dispatchAction from 'Core/dispatchAction';
import { SET_CURRENT_ITERATION_SET_INDEX } from 'Actions/constants/words';

const goToWord: ActionProto<number, null> = (index: number = 0) => (dispatch: Dispatch) =>
{
    dispatchAction(dispatch, SET_CURRENT_ITERATION_SET_INDEX, index);
};

export default goToWord;
