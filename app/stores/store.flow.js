// @flow

export type Action = {
    /**
     * @type Symbol
     */
    type: Object,
    payload: mixed
}

export type UserStore = {
    authorized: boolean,
}
