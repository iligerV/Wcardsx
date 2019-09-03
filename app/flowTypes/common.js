// @flow
// import typeof { Component as ReactComponent } from 'react'; todo: вылечить это говно [1]
import type { Dispatch } from 'redux';
import type Context from 'Core/Context';

export type Action = Function;
export type ActionBase<T> = (dispatch: Dispatch, getState: Function, context: Context) => ?Promise<T>;
export type ActionProto<T, R> = (payload: T) => ActionBase<R>;

export type RefObject = {
    // todo: хер его знает как сделать рефы по нормальному, чтобы flow съедал
    // https://flow.org/en/docs/react/types
    // eslint-disable-next-line flowtype/no-weak-types
    current: any;
}
