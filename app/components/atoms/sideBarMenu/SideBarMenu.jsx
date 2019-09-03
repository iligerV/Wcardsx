// @flow
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import Lists from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// types
import type { ComponentType } from 'react';
import type Context from 'Core/Context';
import type { MenuItem, MenuCallback } from 'Components/atoms/sideBarMenu/sideBarMenu.flow';
import type { Match } from 'Stores/ApplicationStore.flow';

// utils
import map from '@tinkoff/utils/array/map';
import IS_SERVER_RUNTIME from 'Utils/isServerRuntime';
import getMenu from './menu';

import styles from './SideBarMenu.css';

type Props = {
    context: Context,
    routeMatch: Match,
};

class SidebarMenu extends Component<Props>
{
    getLink = (linkReceiver: MenuCallback, link: string = ''): string =>
    {
        const { routeMatch: { params } } = this.props;

        return linkReceiver ? linkReceiver(params) : link;
    };

    getListItemContent = (ComponentIcon: ComponentType<*>, text: string) => <Fragment>
        <ListItemIcon>
            <ComponentIcon />
        </ListItemIcon>
        <ListItemText primary={text} />
    </Fragment>;

    checkCurrentRoute = (link: string): boolean =>
    {
        if (IS_SERVER_RUNTIME)
        {
            return false;
        }
        return window.location.hash.slice(1) === link;
    };

    render()
    {
        const { routeMatch: { path } } = this.props;
        const menuItems: MenuItem[] = getMenu(path);

        return <Lists>
            {
                map(({ link, linkReceiver, text, icon }: MenuItem) =>
                {
                    const route = this.getLink(linkReceiver, link);
                    const isCurrentRoute = this.checkCurrentRoute(route);

                    if (isCurrentRoute)
                    {
                        return <ListItem
                            key={route}
                            selected
                        >
                            {this.getListItemContent(icon, text)}
                        </ListItem>;
                    }

                    return <li key={route}>
                        <Link className={styles.listItem} to={route}>
                            <ListItem
                                button
                            >
                                {this.getListItemContent(icon, text)}
                            </ListItem>
                        </Link>
                    </li>;
                }, menuItems)
            }
        </Lists>;
    }
}

export default SidebarMenu;
