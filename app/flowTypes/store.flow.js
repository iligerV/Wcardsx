// @flow

export type Action = {
    /**
     * @type Symbol
     */
    type: Object,
    payload: any // eslint-disable-line flowtype/no-weak-types
}

export type UserStore = {
    authorized: boolean,
    appKey: string,
    token: string,
    isMobile: boolean,
}
