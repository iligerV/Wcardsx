// @flow
import type { Dispatch } from 'redux';
import type { ActionProto } from 'Types/common';
import type Context from 'Core/Context';
import dispatchAction from 'Core/dispatchAction';
import { SAVE_RAW_SETS } from 'Actions/constants/readSets';


// const readSetData: ActionProto<string, SetData[]> = (inId: string) => (dispatch: Dispatch, getState: Function): Promise<SetData[]> =>
const actionTmpl: ActionProto<string, null> = redirectStruc => (dispatch: Dispatch, getState: Function, context: Context) =>
{
    // ...
    dispatchAction(dispatch, SAVE_RAW_SETS, {});
    Promise.resolve();
};

export default actionTmpl;
