// @flow
import React from 'react';
import type { ComponentType } from 'react';

// Pages
import PageSetsList from 'Containers/PageSetsListContainer.jsx';
import LoginPage from 'Containers/PageLoginContainer.jsx';
import PageSet from 'Containers/PageSetContainer.jsx';
import TrelloPageLists from 'Containers/PageTrelloListsContainer.jsx';
import PageLearn, { MODE_LEARN } from 'Containers/PageLearnRepeatSetsContainer.jsx';

// Routes
import {
    LOGIN,
    LEARN_SET,
    REPEAT_SET,
    HOME,
    SET,
} from './constants';

type Params = {
    authorized: boolean
}

export type RouteConfig = {
    path: string,
    component: ComponentType<Object>,
    needRedirect?: boolean,
    extraProps?: mixed,
    redirectTo?: string,
    routeProps?: {
        [string]: string,
    },
}

const getRouteDefaults = (authorized: boolean) => ({
    needRedirect: !authorized,
    redirectTo: LOGIN,
});

const routesConfig = ({ authorized }: Params): RouteConfig[] => [
    {
        path: LOGIN,
        component: LoginPage,
        needRedirect: authorized,
        redirectTo: HOME,
    },
    {
        path: `${LEARN_SET}/:id`,
        exact: true,
        component: PageLearn,
        routeProps: {
            mode: MODE_LEARN,
        },
        ...getRouteDefaults(authorized),
    },
    {
        path: `${REPEAT_SET}/:id`,
        exact: true,
        component: PageLearn,
        ...getRouteDefaults(authorized),
    },
    {
        path: HOME,
        exact: true,
        component: TrelloPageLists,
        ...getRouteDefaults(authorized),
    },
    {
        path: `${HOME}/:id`,
        component: TrelloPageLists,
        ...getRouteDefaults(authorized),
    },
    {
        path: `${SET}:id`,
        component: PageSet,
        ...getRouteDefaults(authorized),
    },
    {
        path: '/sets',
        component: PageSetsList,
        ...getRouteDefaults(authorized),
    },
    {
        path: '/sets/:id',
        component: PageSet,
        ...getRouteDefaults(authorized),
    },
    {
        path: '/',
        component: LoginPage,
        needRedirect: true,
        redirectTo: LOGIN,
        exact: true,
    },
];

export default routesConfig;
