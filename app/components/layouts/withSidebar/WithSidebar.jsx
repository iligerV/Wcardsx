// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import AppReactContext from 'Core/AppReactContext';

// types
import type Context from 'Core/Context';
import type { Match } from 'Stores/ApplicationStore.flow';
import type { Action } from 'Types/common';

// constants
import { MatchDefault } from 'Stores/constants/applicationStore';

// actions
import setLogged from 'Actions/setLogged';

// material-ui
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { ExitToApp } from '@material-ui/icons';
import Button from '@material-ui/core/Button';

import getClassForMaterial from 'Utils/getClassForMaterial';

import SideBarMenu from 'Components/atoms/sideBarMenu/SideBarMenu.jsx';

import styles from './withSidebar.css';

type Props = {
    classes?: Object,
    title: string,
    subtitle?: string,
    children: Node,
    routeMatch?: Match,
    setLogged: Action,
    isLearnMode: boolean,
    isRepeatMode: boolean,
    isMobile: boolean,
};
type State = {
    open: boolean,
}

class WithSidebar extends Component<Props, State>
{
    state = {
        open: !this.props.isMobile,
    };

    handleDrawerOpen = () =>
    {
        this.setState({ open: true });
    };

    handleDrawerClose = () =>
    {
        this.setState({ open: false });
    };

    render()
    {
        const {
            title,
            subtitle,
            children,
            routeMatch = MatchDefault,
            isLearnMode,
            isRepeatMode,
            setLogged,
            isMobile,
        } = this.props;
        const { open } = this.state;

        const drawer = (
            <Drawer
                variant='persistent'
                anchor='left'
                open={open}
                classes={{
                    // vtodo: внутри прим. через classnames переделать на postcss
                    paper: styles.drawerPaper,
                }}
            >
                <div className={classNames(styles.drawerHeader)}>
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <AppReactContext.Consumer>
                    {(context: Context) =>
                        <SideBarMenu context={context} routeMatch={routeMatch} />
                    }
                </AppReactContext.Consumer>
            </Drawer>
        );

        return (
            <div className={styles.wrapper}>
                <div className={styles.appFrame}>
                    <AppBar
                        className={classNames(styles.appBar, { [styles.appBarDrawerOpen]: open })}
                    >
                        <Toolbar
                            classes={getClassForMaterial({
                                [styles.titleContainer]: open,
                            })}
                            disableGutters={!open}
                        >
                            <IconButton
                                color='inherit'
                                aria-label='open drawer'
                                onClick={this.handleDrawerOpen}
                                className={classNames(styles.menuButton, open && styles.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                classes={getClassForMaterial(styles.title)}
                                variant='h5'
                                color='inherit'
                                component='div'
                            >
                                <div className={styles.titleWrapper}>
                                    {title}
                                    {subtitle && <span className={styles.titleComment}> ({subtitle})</span>}
                                </div>
                                {isLearnMode && <SpellcheckIcon className={styles.titleIcon} />}
                                {isRepeatMode && <DoneAllIcon className={styles.titleIcon} />}
                            </Typography>
                            <Button
                                color='inherit'
                                aria-label={isMobile && 'logout'}
                                className={classNames(styles.logoutButton)}
                                onClick={() => setLogged(false)}
                            >
                                <ExitToApp
                                    className={classNames(styles.logoutButtonSvgIcon)}
                                />
                                {!isMobile && 'logout'}
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {drawer}
                    <main
                        className={classNames(styles.content, styles.contentLeft, {
                            [styles.contentShift]: open,
                            [styles.contentShiftLeft]: open,
                        })}
                    >
                        {children}
                    </main>
                </div>
            </div>
        );
    }
}

function mapStateToProps({
    ApplicationStore: {
        routeMatch,
    },
    UserStore: {
        isMobile,
    },
})
{
    return {
        routeMatch,
        isMobile,
    };
}

const mapDispatchToProps = { setLogged };

export default connect(mapStateToProps, mapDispatchToProps)(WithSidebar);
