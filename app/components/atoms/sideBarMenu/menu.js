// @flow
import React from 'react';

import keys from '@tinkoff/utils/object/keys';
import propOr from '@tinkoff/utils/object/propOr';

import IconListIcon from '@material-ui/icons/FormatListBulleted';
import IconKeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import IconSpellcheck from '@material-ui/icons/Spellcheck';
import IconDoneAll from '@material-ui/icons/DoneAll';
import IconSettings from '@material-ui/icons/Settings';

import {
    LEARN_SET,
    REPEAT_SET,
    HOME,
    SETS,
    SET,
} from 'Src/routes/constants';

import type { MenuCallbackParams, MenuItem } from './sideBarMenu.flow';

const Menus = {
    homeMenu: {
        routes: [
            { route: HOME, exact: false },
        ],
        items: [
            {
                icon: IconListIcon,
                text: 'Sets list',
                link: SETS,
            },
        ],
    },
    setMenu: {
        routes: [
            { route: SET, exact: false },
            { route: LEARN_SET, exact: false },
            { route: REPEAT_SET, exact: false },
        ],
        items: [
            {
                icon: IconKeyboardBackspace,
                text: 'back to sets list',
                link: SETS,
            },
            {
                icon: IconSpellcheck,
                text: 'Start learning',
                linkReceiver: (params: MenuCallbackParams) => `${LEARN_SET}/${params.id}`,
            },
            {
                icon: IconDoneAll,
                text: 'Start repeating',
                linkReceiver: (params: MenuCallbackParams) => `${REPEAT_SET}/${params.id}`,
            },
        ],
    },
    setsMenu: {
        routes: [
            { route: SETS, exact: true },
        ],
        items: [
            {
                icon: IconSettings,
                text: 'Settings',
                link: HOME,
            },
        ],
    },
};

const isMatchPath = (path: string) => (route: string, exact: boolean = true) =>
    exact ? path === route : path.indexOf(route) === 0;
const checkRoutes = (routes, isRoute) => routes.find(({ route, exact }) => isRoute(route, typeof exact === 'undefined' ? true : exact));
const findKey = (menus, path) => keys(menus).find(key => checkRoutes(menus[key].routes, isMatchPath(path)));
const findMenu = (menus, path) => menus[findKey(menus, path)];

const getMenu = (path: string): MenuItem[] => propOr('items', [], findMenu(Menus, path));

export default getMenu;
