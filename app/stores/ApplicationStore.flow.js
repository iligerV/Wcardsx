// @flow

export type MatchParams = {
    id: string,
};

export type Match = {
    path: string,
    params: MatchParams,
};

export type ApplicationStore = {
    routeMatch: Match,
    nodeEnv: {
        version: string,
        mode: string,
    },
};
