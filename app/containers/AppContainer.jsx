// @flow
/**
 * Libs
 * https://github.com/niksy/throttle-debounce
 * https://rawgit.com/Vlasakh/Print/master/react/src/utils.js
 * https://cdn.rawgit.com/Vlasakh/Print/master/react/src/utils.js
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { matchPath } from 'react-router';
import { Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import type { ContextRouter } from 'react-router-dom';

import compose from '@tinkoff/utils/function/compose';
import find from '@tinkoff/utils/array/find';

import routesConfig from 'Src/routes/routesConfig';
import Route from 'Src/routes/Route.jsx';
import detectMobile from 'Actions/detectMobile';
import setRouteMatch from 'Actions/application/setRouteMatch';
import setNodeEnv from 'Actions/application/setNodeEnv';
import { EMPTY_MATCH } from 'Stores/applicationStore';

import type { RouteConfig } from 'Src/routes/routesConfig';
import type Context from 'Core/Context';
import type { Match } from 'Stores/ApplicationStore.flow';

import 'Src/styles/index.css';

const findRoute = (url: string, routes: RouteConfig[] | []): Match => {
    let match: Match = EMPTY_MATCH;

    find((config: RouteConfig) => {
        match = matchPath(url, config);

        return match;
    })(routes);

    return match;
};

type Location = {
    hash: string,
    pathname: string,
    search: string,
    state: mixed,
}

type Props = {
    history: ContextRouter.history,
    location: window.location,
    match: Match,
    context: Context,
    authorized: boolean,
};

type State = {
    authorized: boolean | null,
    routesConfig: RouteConfig[] | [],
};

// eslint-disable-next-line react/prefer-stateless-function
class AppContainer extends Component<Props, State> {
    static propTypes = {
        authorized: PropTypes.bool,
    };

    static defaultProps = {
        authorized: false,
    };

    static getDerivedStateFromProps(props: Props, state: State) {
        if (props.authorized !== state.authorized) {
            return {
                routesConfig: routesConfig({ authorized: props.authorized }),
                authorized: props.authorized,
            };
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            authorized: null,
            routesConfig: routesConfig({ authorized: props.authorized }),
        };

        const [, url] = window.location.hash.split('#');

        props.context.setHistory(props.history);
        props.detectMobile();
        this.setRoute(props.context, url);
        this.setNodeEnv();
    }

    componentDidUpdate(prevProps) {
        const { location, authorized } = this.props;

        if (location.pathname !== prevProps.location.pathname || prevProps.authorized !== authorized) {
            this.handleRouteChange(location);
        }
    }

    handleRouteChange = (location: Location) => {
        this.setRoute(this.props.context, location.pathname);
    };

    setRoute = (context, url: string) => {
        context.executeAction(setRouteMatch, findRoute(url, this.state.routesConfig));
    };

    setNodeEnv() {
        this.props.setNodeEnv().then(data => {
            document.title = `${document.title} ${data.version}`;
        });
    }

    render() {
        return <Switch>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {this.state.routesConfig.map((route, i) => <Route key={i} {...route} />)}
        </Switch>;
    }
}

export default compose(
    withRouter,
    connect(
        state => ({
            authorized: state.UserStore.authorized,
        }),
        dispatch =>
            bindActionCreators({
                setRouteMatch,
                setNodeEnv,
                detectMobile,
            }, dispatch)
    )
)(AppContainer);
